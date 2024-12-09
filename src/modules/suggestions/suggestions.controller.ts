import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SuggestionsService } from './suggestions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@ApiTags('Self-Hypnosis Sessions')
@Controller('suggestions')
export class SuggestionsController {
  constructor(private readonly suggestionsService: SuggestionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new hypnosis session' })
  @ApiResponse({ status: 201, description: 'Session successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.suggestionsService.create(createSessionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all hypnosis sessions' })
  @ApiResponse({ status: 200, description: 'Return all sessions.' })
  findAll() {
    return this.suggestionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific hypnosis session' })
  @ApiResponse({ status: 200, description: 'Return the session.' })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  findOne(@Param('id') id: string) {
    return this.suggestionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a hypnosis session' })
  @ApiResponse({ status: 200, description: 'Session successfully updated.' })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.suggestionsService.update(id, updateSessionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a hypnosis session' })
  @ApiResponse({ status: 200, description: 'Session successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  remove(@Param('id') id: string) {
    return this.suggestionsService.remove(id);
  }
}
