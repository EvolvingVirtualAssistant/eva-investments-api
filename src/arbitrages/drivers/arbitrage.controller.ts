import {
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Header,
  HttpStatus,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  Res
} from '@nestjs/common';
import { Body, Query } from '@nestjs/common/decorators';
import { Response } from 'express';
import { ArbitrageService } from '../domain/services/arbitrage.service';
import { ArbitrageDto } from './dtos/arbitrage.dto';
import { ArbitragesStatuses } from './dtos/arbitrages-statuses.dto';

@Controller('arbitrages')
export class ArbitrageController {
  constructor(private arbitrageService: ArbitrageService) {}

  @Get()
  getArbitrages(
    @Res({ passthrough: true }) response: Response,
    @Query('status') status?: string,
    @Query('account') account?: string,
    @Query('chainId', new DefaultValuePipe(null), ParseIntPipe)
    chainId?: number,
    @Query('pools', new DefaultValuePipe(null), ParseArrayPipe)
    pools?: string[], // e.g., AGVE/WXDAI (use %2F as a replacement for the slash character between the tokens of a pool)
    @Query('tokens', new DefaultValuePipe(null), ParseArrayPipe)
    tokens?: string[], // e.g., AGVE, WXDAI
    @Query('exchages', new DefaultValuePipe(null), ParseArrayPipe)
    exchages?: string[] // e.g., HONEYSWAP, SWAPR -> the comma is equivalent to an OR, while every parameter relates to other parameters using AND
  ) {
    const arbitrages = this.arbitrageService.getArbitrages({
      status,
      account,
      chainId,
      pools,
      tokens,
      exchages
    });

    response.status(HttpStatus.OK);
    return arbitrages;
  }

  @Post()
  createArbitrage(
    @Res({ passthrough: true }) response: Response,
    @Body() arbitrageDto: ArbitrageDto
  ) {
    const arb = this.arbitrageService.createArbitrage(arbitrageDto);

    response.status(HttpStatus.CREATED);
    return arb.id;
  }

  @Patch()
  updateArbitragesStatuses(
    @Res({ passthrough: true }) response: Response,
    @Body() arbitragesStatuses: ArbitragesStatuses
  ) {
    this.arbitrageService.updateArbitragesStatuses(arbitragesStatuses);
    response.status(HttpStatus.OK);
  }

  @Get(':id')
  getArbitrage(
    @Res({ passthrough: true }) response: Response,
    @Param('id') id: string
  ) {
    const arb = this.arbitrageService.getArbitrage(id);

    if (arb == null) {
      response.status(HttpStatus.NOT_FOUND);
    } else {
      response.status(HttpStatus.OK);
      return arb;
    }
  }

  @Delete(':id')
  deleteArbitrage(
    @Res({ passthrough: true }) response: Response,
    @Param('id') id: string
  ) {
    const arb = this.arbitrageService.deleteArbitrage(id);

    if (arb == null) {
      response.status(HttpStatus.NOT_FOUND);
    } else {
      response.status(HttpStatus.NO_CONTENT);
    }
  }

  // RFC 6902 - https://www.rfc-editor.org/rfc/rfc6902
  @Patch(':id')
  @Header('Content-Type', 'application/json-patch+json') // use https://www.npmjs.com/package/fast-json-patch?activeTab=readme
  updateArbitrage(
    @Res({ passthrough: true }) response: Response,
    @Param('id') id: string,
    @Body() arbitrage: JsonPatch<any>
  ) {
    this.arbitrageService.updateArbitrage(id, arbitrage);
    response.status(HttpStatus.OK);
  }
}

interface JsonPatch<T> {
  operations: JsonPatchOperation<T>[];
}

interface JsonPatchOperation<T> {
  op: 'add' | 'remove' | 'replace' | 'copy' | 'move' | 'test';
  path: string; // JSON Pointer RFC 6901 - https://www.rfc-editor.org/rfc/rfc6902
  value?: T;
  from?: string;
}
