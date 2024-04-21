import { Test, TestingModule } from '@nestjs/testing';
import { MedSpaController } from './medspa.controller.js';
import { expect, describe, beforeEach, it } from 'vitest';

describe('MedspaController', () => {
  let controller: MedSpaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedSpaController],
    }).compile();

    controller = module.get<MedSpaController>(MedSpaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
