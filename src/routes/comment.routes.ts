import { Router } from 'express';
import grpcClient from '../grpc/core/grpc-client';

import { createCommentSchema } from '../schemas/comment.schema';
import { validateSchema } from '../middlewares/validate-schema.middleware';
import { validateToken } from '../middlewares/validate-token.middleware';

const router = Router();

router.get(
  '/:chapterId',
  (req, res) => {
    const { chapterId } = req.params;
    grpcClient.GetCommentsByChapterId({ chapterId }, (err: any, response: any) => {
      if (err) {
        console.error('Error al obtener comentarios vía gRPC:', err);
        res.status(500).json({ error: 'Error al obtener los comentarios' });
        return;
      }

      res.status(200).json(response);
    });
  }
)

router.post(
  '/',
  validateToken,
  validateSchema(createCommentSchema, 'body'),
  (req, res) => {
    const { chapterId, accountId, message, username } = req.body;
    console.log('Datos del comentario:', { chapterId, accountId, message, username });

    grpcClient.SaveComment({ chapterId, accountId, message, username }, (err: any, response: any) => {
      if (err) {
        console.error('Error al guardar comentario vía gRPC:', err);
        res.status(500).json({ error: 'Error al guardar el comentario' });
        return;
      }

      res.status(201).json(response);
    });
  }
);

router.post(
  '/reply/:commentId',
  validateToken,
  (req, res) => {
    const { commentId } = req.params;
    const { accountId, message, username } = req.body;

    grpcClient.SaveReply({ commentId, accountId, message, username }, (err: any, response: any) => {
      if (err) {
        console.error('Error al guardar respuesta vía gRPC:', err);
        res.status(500).json({ error: 'Error al guardar la respuesta' });
        return;
      }

      res.status(201).json(response);
    });
  }
);

export default router;