# Setup Guide

## Prerequisites

- Node.js 18+
- PostgreSQL
- MetaMask or compatible wallet
- Git

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd decentralized-education
```

### 2. Install Dependencies

```bash
npm run install:all
```

### 3. Environment Setup

#### Backend

Copy the environment file:
```bash
cd backend
cp .env.example .env
```

Update the following variables in `backend/.env`:
- `DATABASE_URL`: Your PostgreSQL connection string
- `JWT_SECRET`: Generate a secure random string
- `ETHEREUM_RPC_URL`: Your Ethereum RPC endpoint
- `FRONTEND_URL`: Your frontend URL (default: http://localhost:3000)

#### Frontend

Copy the environment file:
```bash
cd frontend
cp .env.example .env.local
```

Update the following variables in `frontend/.env.local`:
- `NEXT_PUBLIC_API_URL`: Your backend API URL
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: Your WalletConnect project ID
- `NEXT_PUBLIC_INFURA_PROJECT_ID`: Your Infura project ID

### 4. Database Setup

```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

### 5. Start Development Servers

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

## Configuration

### Database

The application uses PostgreSQL with Prisma ORM. The database schema is defined in `backend/prisma/schema.prisma`.

### Web3 Configuration

1. **WalletConnect**: Create a project at [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. **Infura**: Create a project at [Infura](https://infura.io/)
3. **DripsNetwork**: Configure the contract address in environment variables

### Environment Variables

#### Backend (.env)
```env
PORT=3001
NODE_ENV=development
DATABASE_URL="postgresql://username:password@localhost:5432/decentralized_education"
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/your-infura-project-id
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-walletconnect-project-id
NEXT_PUBLIC_INFURA_PROJECT_ID=your-infura-project-id
```

## Development

### Database Management

```bash
# View database
npx prisma studio

# Reset database
npx prisma migrate reset

# Generate client
npx prisma generate
```

### Testing

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

### Building for Production

```bash
# Build both frontend and backend
npm run build

# Start production server
npm start
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**: Ensure PostgreSQL is running and DATABASE_URL is correct
2. **Wallet Connection Error**: Check WalletConnect project ID and Infura credentials
3. **CORS Error**: Verify FRONTEND_URL matches your frontend URL
4. **TypeScript Errors**: Run `npm run build` to check for compilation issues

### Debug Mode

Set `NODE_ENV=development` to enable detailed error messages and debugging features.

## Deployment

### Backend Deployment

1. Set production environment variables
2. Run database migrations: `npx prisma migrate deploy`
3. Build the application: `npm run build`
4. Start the server: `npm start`

### Frontend Deployment

1. Set production environment variables
2. Build the application: `npm run build`
3. Deploy the `out` or `.next` directory to your hosting provider

## Security Considerations

- Never commit `.env` files to version control
- Use strong JWT secrets in production
- Enable HTTPS in production
- Implement rate limiting and input validation
- Regular security audits of smart contracts
