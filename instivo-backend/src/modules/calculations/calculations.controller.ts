import CalculationService from '@modules/calculations/services/Calculations.service';
import DeleteCalculationsService from '@modules/calculations/services/DeleteCalculations.service';
import EditCalculationsService from '@modules/calculations/services/EditCalculations.service';
import ListCalculationsService from '@modules/calculations/services/ListCalculations.service';
import ShowCalculationsService from '@modules/calculations/services/ShowCalculations.service';
import UpdateCalculationsService from '@modules/calculations/services/UpdateCalculations.service';
import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CalculationsController {
  public async calculate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { date, salary, zipCode } = request.body;

    const calculationService = container.resolve(CalculationService);

    const result = await calculationService.execute({ date, salary, zipCode });

    return response.status(HttpStatusCode.Ok).json(result);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page, limit, ...filters } = request.query;

    const listAllCalculationsService = container.resolve(
      ListCalculationsService,
    );

    const result = await listAllCalculationsService.execute({
      page: Number(page),
      limit: Number(limit),
      filters,
    });

    return response.status(HttpStatusCode.Ok).json(result);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCalculationsService = container.resolve(ShowCalculationsService);
    const result = await showCalculationsService.execute({ id });

    return response.status(HttpStatusCode.Ok).json(result);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { date, salary, zipCode } = request.body;

    const updateCalculationsService = container.resolve(
      UpdateCalculationsService,
    );

    const result = await updateCalculationsService.execute({
      id,
      date,
      salary,
      zipCode,
    });

    return response.status(HttpStatusCode.Ok).json(result);
  }

  public async edit(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { date, salary, zipCode } = request.body;

    const editCalculationsService = container.resolve(EditCalculationsService);

    const result = await editCalculationsService.execute({
      id,
      date,
      salary,
      zipCode,
    });

    return response.status(HttpStatusCode.Ok).json(result);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCalculationsService = container.resolve(
      DeleteCalculationsService,
    );

    await deleteCalculationsService.execute({ id });

    return response.status(HttpStatusCode.NoContent).send();
  }
}

export default CalculationsController;
