import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

type ProductsChangedPayload = {
  type: 'created' | 'deleted' | 'updated';
  _id?: string;
};

@WebSocketGateway({
  namespace: '/sockets', // o “canal” do Socket.IO
  cors: {
    origin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173',
    credentials: true,
  },
})
export class ProductsGateway implements OnGatewayInit {
  @WebSocketServer() io!: Server;

  afterInit() {
    // Opcional: útil para debug/logs
    // console.log('[Socket] ProductsGateway inicializado');
  }

  /**
   * Emite para TODOS os clientes que a lista de produtos mudou.
   * O frontend vai ouvir o evento "products:changed"
   * e invalidar automaticamente a cache do React Query.
   */
  emitProductsChanged(payload: ProductsChangedPayload) {
    this.io.emit('products:changed', payload);
  }
}
