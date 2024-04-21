import { expect, describe, beforeEach, it } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { MedSpaService } from './medspa.service.js';

describe('MedspaService', () => {
  let service: MedSpaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedSpaService],
    }).compile();

    service = module.get<MedSpaService>(MedSpaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
