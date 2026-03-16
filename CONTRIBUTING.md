# 🤝 Contributing to Decentralized Education Platform (Stellar)

Thank you for your interest in contributing to the Stellar-based Decentralized Education Platform! This guide will help you get started with contributing through our EDU token bounty system.

## 🎯 How to Contribute

### 1. Find a Bounty

Browse our [GitHub Issues](https://github.com/zeeboys/education/issues) for bounties labeled with `bounty`. Each bounty includes:

- **Category** (Content Creation, Development, Design, Translation, etc.)
- **Difficulty Level** (Beginner to Expert)
- **Reward Amount** (EDU tokens)
- **Requirements** and **Acceptance Criteria**
- **Skills Required**

### 2. Apply for a Bounty

1. **Find a bounty** that matches your skills
2. **Comment on the issue** using the application template:
   ```markdown
   **GitHub:** @yourusername
   **Stellar Address:** GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   **Experience:** [Brief description of relevant experience]
   **Approach:** [How you plan to complete this bounty]
   **Timeline:** [Estimated completion time]
   **Questions:** [Any questions about the requirements]
   ```
3. **Wait for assignment** from maintainers

### 3. Complete the Work

Once assigned:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/zeeboys/education.git
   cd decentralized-education
   ```

2. **Setup your environment**:
   ```bash
   npm run install:all
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env.local
   # Setup Stellar wallet (Freighter, Albedo, etc.)
   ```

3. **Create a feature branch**:
   ```bash
   git checkout -b bounty/[issue-number]-[brief-description]
   ```

4. **Complete the work** according to the requirements
5. **Test your changes** thoroughly

### 4. Submit Your Work

1. **Push directly to main** (no PR needed):
   ```bash
   git add .
   git commit -m "Complete bounty #[issue-number]: [brief description]"
   git push origin main
   git push organization main
   ```

2. **Comment on the issue** with completion details:
   ```markdown
   **Bounty Completed**: #[issue-number]
   **Changes Made**: [Detailed description]
   **Testing**: [How you tested your work]
   **Screenshots/Demo**: [If applicable]
   **Stellar Address**: GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

### 5. Get Paid (EDU Tokens)

Once your work is merged:

1. **Instant EDU token payment** via Stellar smart contracts
2. **On-chain transaction tracking** for transparency
3. **Reputation points** added to your profile
4. **Certificate of completion** for your portfolio

## 💰 EDU Token Reward System

### Bounty Tiers

| Difficulty | Reward Range (EDU) | Example Tasks |
|------------|-------------------|---------------|
| 🌱 Beginner | 50-100 EDU | Documentation, simple fixes |
| 🚀 Intermediate | 100-300 EDU | Features, components |
| ⚡ Advanced | 300-500 EDU | Complex integrations |
| 🏆 Expert | 500+ EDU | Architecture, research |

### Stellar Payment Process

1. **Work Merged** → Instant EDU token payment (3-5 seconds)
2. **Stellar Transaction** → On-chain payment verification
3. **Smart Contract Escrow** → Secure fund release
4. **Reputation Update** → On-chain profile enhancement

### EDU Token Benefits

- **Ultra-low fees**: ~$0.000001 per transaction
- **Instant payments**: 3-5 second confirmations
- **Global access**: Available worldwide without gas fees
- **Built-in DEX**: Trade EDU tokens on Stellar DEX

## 🛠️ Development Guidelines

### Code Style

- **TypeScript** for type safety
- **ESLint** configuration included
- **Prettier** for code formatting
- **Conventional Commits** for commit messages

### Testing

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test

# E2E tests
npm run test:e2e
```

### Project Structure

```
decentralized-education/
├── frontend/          # Next.js application (React, TypeScript, Tailwind)
├── backend/           # Express API server (Node.js, TypeScript, Prisma)
├── contracts/        # Stellar smart contracts (Rust, Soroban)
├── shared/            # Shared types and utilities
├── scripts/           # Stellar deployment scripts
├── docs/              # Documentation
└── .github/           # Workflows and templates
```

### Smart Contract Development

```bash
# Build Stellar contracts
cd contracts
cargo build --target wasm32-unknown-unknown --release

# Deploy contracts
npm run deploy:all

# Test contracts
npm run test
```

## 🏆 Recognition System

### Reputation Points

- **Beginner Bounty**: +10 points
- **Intermediate Bounty**: +25 points
- **Advanced Bounty**: +50 points
- **Expert Bounty**: +100 points

### Achievement Badges

- 🌟 **First Contribution**: Complete your first bounty
- 🔥 **Streak Master**: Complete 5+ bounties in a month
- 💎 **Quality Expert**: Maintain 95%+ approval rate
- 🎓 **Mentor**: Help other contributors

### Leaderboard

Top contributors are displayed on:
- GitHub repository README
- Platform dashboard
- Monthly community calls

## 🤝 Community Guidelines

### Code of Conduct

- **Respectful communication** with all contributors
- **Constructive feedback** on PRs and issues
- **Inclusive language** and behavior
- **No discrimination** or harassment

### Best Practices

- **Ask questions** if requirements are unclear
- **Provide updates** on your progress
- **Review others' PRs** when possible
- **Share knowledge** with the community

## 📚 Learning Resources

### Getting Started

- [Stellar Documentation](https://developers.stellar.org/)
- [Soroban Smart Contracts](https://soroban.stellar.org/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Prisma Docs](https://www.prisma.io/docs/)

### Stellar Development

- [Stellar SDK for JavaScript](https://github.com/stellar/js-stellar-sdk)
- [Soroban Documentation](https://soroban.stellar.org/docs/)
- [Stellar Laboratory](https://laboratory.stellar.org/)
- [Freighter Wallet](https://freighter.app/)

## 🆘 Getting Help

### Support Channels

- **GitHub Discussions**: Ask questions and share ideas
- **Discord Community**: Real-time chat with contributors
- **Office Hours**: Weekly calls with maintainers
- **Documentation**: Comprehensive guides and API docs

### Common Issues

1. **Setup Problems**: Check environment configuration
2. **Database Issues**: Verify PostgreSQL connection
3. **Stellar Wallet Connection**: Ensure Freighter/Albedo is configured
4. **Contract Deployment**: Check Stellar network settings
5. **EDU Token Balance**: Verify trustline is established

## 📈 Impact Metrics

Your contributions help:

- 🎓 **Educate** thousands of Web3 learners globally
- 💰 **Distribute** 10,000+ EDU tokens in monthly rewards
- 🌍 **Build** a global education community
- 🔓 **Democratize** access to Web3 knowledge
- ⚡ **Enable** instant payments via Stellar

## 🎉 Thank You!

Every contribution helps make Web3 education more accessible and sustainable through Stellar's ultra-fast, low-cost blockchain. We're excited to have you join our community of builders and educators!

---

**Ready to start?** [Browse Available Bounties](https://github.com/zeeboys/education/issues?q=is%3Aissue+is%3Aopen+label%3Abounty) 🚀

**Requirements:**
- ✅ Stellar wallet (Freighter, Albedo, or compatible)
- ✅ Basic knowledge of React/Node.js
- ✅ Passion for education and Web3
- ✅ Ready to earn EDU tokens!
