# Decentralized Education Platform 🎓💧

A full-stack decentralized education platform for learning Web3, blockchain, and open-source development with DripsNetwork funding and contributor rewards.

## 🏗️ Project Structure

```
decentralized-education/
├── frontend/          # Next.js frontend application
├── backend/           # Node.js/Express backend API
├── shared/            # Shared types and utilities
├── docs/              # Documentation
├── scripts/           # DripsNetwork integration scripts
└── README.md
```

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Wagmi** - Web3 wallet connections
- **RainbowKit** - Wallet UI components

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Web3.js** - Blockchain interactions

### Features
- 🔐 Wallet-based authentication
- 📚 Educational content management
- 💰 Bounty system with DripsNetwork integration
- 👥 Contributor profiles and reputation
- 🏆 Certification system
- 📊 Impact metrics dashboard

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL
- MetaMask or compatible wallet

### Quick Start

1. **Clone and install dependencies**
   ```bash
   cd decentralized-education
   npm run install:all
   ```

2. **Setup environment**
   ```bash
   # Backend
   cd backend && cp .env.example .env
   
   # Frontend  
   cd frontend && cp .env.example .env.local
   ```

3. **Setup database**
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma generate
   ```

4. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev

   # Terminal 2 - Frontend
   cd frontend && npm run dev
   ```

### Detailed Setup

For detailed setup instructions, see [docs/SETUP.md](docs/SETUP.md)

## � How to Contribute

### For Contributors
1. **Browse Issues** - Find educational bounties that match your skills
2. **Apply for Bounties** - Comment on issues with your experience and approach
3. **Complete Work** - Follow requirements and submit pull requests
4. **Get Rewarded** - Receive automatic ETH payments via DripsNetwork

### For Funders
1. **Support Education** - Fund specific learning modules or contributors
2. **Track Impact** - See exactly how your funds are used
3. **Sustainable Giving** - Set up recurring funding streams
4. **Tax Benefits** - Support open-source education

### Quick Start for Contributors
```bash
# 1. Find a bounty at https://github.com/akordavid373/decentralized-education/issues
# 2. Apply using the template in the issue
# 3. Clone and setup the project
git clone https://github.com/akordavid373/decentralized-education.git
cd decentralized-education
npm run install:all

# 4. Create your feature branch
git checkout -b bounty/[issue-number]-[description]

# 5. Complete the work and submit a PR
```

### DripsNetwork Integration
- **Automated Payments**: All bounty rewards distributed via DripsNetwork
- **Transparent Tracking**: On-chain record of all contributions and payments
- **Recurring Funding**: Sustainable support for ongoing contributors
- **Global Access**: Anyone can fund or contribute from anywhere

**Setup Guide**: See [docs/DRIPS_SETUP.md](docs/DRIPS_SETUP.md) for complete DripsNetwork configuration.

## 📄 License

MIT License - see LICENSE file for details.
