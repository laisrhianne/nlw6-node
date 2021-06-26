import { Request, Response } from 'express';
import { CreateComplimentService } from '../services/CreateComplimentService';

class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { user_id: user_sender } = request;
    const { tag_id, user_receiver, message } = request.body;

    const createComplimentService = new CreateComplimentService();

    const compliment = createComplimentService.execute({ tag_id, user_sender, user_receiver, message });

    return response.json(compliment);
  }
}

export { CreateComplimentController };
