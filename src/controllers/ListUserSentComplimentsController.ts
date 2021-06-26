import { Request, Response } from 'express';
import { ListUserSentComplimentsService } from '../services/ListUserSentComplimentsService';

class ListUserSentComplimentsController {
  async handle(request: Request, response: Response) {
    const listUserSentComplimentsService = new ListUserSentComplimentsService();

    const compliments = await listUserSentComplimentsService.execute(request.user_id);

    return response.json(compliments);
  }
}

export { ListUserSentComplimentsController };
