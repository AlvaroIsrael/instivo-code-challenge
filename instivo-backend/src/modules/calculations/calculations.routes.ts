import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';

import CalculationsController from '@modules/calculations/calculations.controller';
import { ensureAuthenticationMiddleware } from '@shared/middlewares/ensureAuthentication.middleware';

const calculationsRouter = Router();
const calculationsController = new CalculationsController();

calculationsRouter.post(
  '/calculations',
  // ensureAuthenticationMiddleware,
  celebrate({
    [Segments.BODY]: Joi.object({
      date: Joi.string().isoDate().required(),
      salary: Joi.number().positive().required(),
      zipCode: Joi.string()
        .pattern(/^\d{5}-\d{3}$/)
        .required(),
    }).required(),
  }),
  calculationsController.calculate,
);

calculationsRouter.get(
  '/calculations',
  // ensureAuthenticationMiddleware,
  celebrate({
    [Segments.QUERY]: Joi.object({
      page: Joi.number().integer().greater(0).optional(),
      limit: Joi.number().integer().greater(0).optional(),
      idUuid: Joi.string().optional(),
      daysPassed: Joi.number().optional(),
      monthsPassed: Joi.number().optional(),
      yearsPassed: Joi.number().optional(),
      salaryPercentage: Joi.number().optional(),
      'zipCodeData.cep': Joi.string().optional(),
      'zipCodeData.logradouro': Joi.string().optional(),
      'zipCodeData.complemento': Joi.string().optional(),
      'zipCodeData.unidade': Joi.string().optional(),
      'zipCodeData.bairro': Joi.string().optional(),
      'zipCodeData.localidade': Joi.string().optional(),
      'zipCodeData.uf': Joi.string().optional(),
      'zipCodeData.estado': Joi.string().optional(),
      'zipCodeData.regiao': Joi.string().optional(),
      'zipCodeData.ibge': Joi.string().optional(),
      'zipCodeData.gia': Joi.string().optional(),
      'zipCodeData.ddd': Joi.string().optional(),
      'zipCodeData.siafi': Joi.string().optional(),
      createdAt: Joi.date().optional(),
      updatedAt: Joi.date().optional(),
    }).optional(),
  }),
  calculationsController.index,
);

calculationsRouter.get(
  '/calculations/:id',
  // ensureAuthenticationMiddleware,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  calculationsController.show,
);

calculationsRouter.put(
  '/calculations/:id',
  // ensureAuthenticationMiddleware,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: Joi.object({
      date: Joi.string().isoDate().required(),
      salary: Joi.number().required(),
      zipCode: Joi.string()
        .pattern(/^\d{5}-\d{3}$/)
        .required(),
    }).required(),
  }),
  calculationsController.update,
);

calculationsRouter.patch(
  '/calculations/:id',
  // ensureAuthenticationMiddleware,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: Joi.object({
      date: Joi.string().isoDate(),
      salary: Joi.number(),
      zipCode: Joi.string().pattern(/^\d{5}-\d{3}$/),
    }).required(),
  }),
  calculationsController.edit,
);

calculationsRouter.delete(
  '/calculations/:id',
  // ensureAuthenticationMiddleware,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  calculationsController.delete,
);

export default calculationsRouter;
