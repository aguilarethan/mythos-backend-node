import { Router } from 'express';
import grpcClient from '../grpc/core/grpc-client';

import { createCommentSchema } from '../schemas/comment.schema';
import { validateSchema } from '../middlewares/validate-schema.middleware';
import { validateToken } from '../middlewares/validate-token.middleware';

const router = Router();

router.post(
  '/',
  validateToken,
  validateSchema(createCommentSchema, 'body'),
  (req, res) => {
    const { chapterId, accountId, message } = req.body;

    grpcClient.SaveComment({ chapterId, accountId, message }, (err: any, response: any) => {
      if (err) {
        console.error('Error al guardar comentario vía gRPC:', err);
        res.status(500).json({ error: 'Error al guardar el comentario' });
        return;
      }

      res.status(201).json(response);
    });
  }
);

export default router;