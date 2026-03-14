# 🤝 Contributing to Decentralized Education

Thank you for your interest in contributing to the Decentralized Education Platform! This guide will help you get started with contributing through our bounty system.

## 🎯 How to Contribute

### 1. Find a Bounty

Browse our [GitHub Issues](https://github.com/akordavid373/decentralized-education/issues) for bounties labeled with `bounty`. Each bounty includes:

- **Category** (Content Creation, Development, Design, etc.)
- **Difficulty Level** (Beginner to Expert)
- **Reward Amount** (ETH)
- **Requirements** and **Acceptance Criteria**
- **Skills Required**

### 2. Apply for a Bounty

1. **Find a bounty** that matches your skills
2. **Comment on the issue** using the application template:
   ```markdown
   **GitHub:** @yourusername
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
   git clone https://github.com/akordavid373/decentralized-education.git
   cd decentralized-education
   ```

2. **Setup your environment**:
   ```bash
   npm run install:all
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env.local
   ```

3. **Create a feature branch**:
   ```bash
   git checkout -b bounty/[issue-number]-[brief-description]
   ```

4. **Complete the work** according to the requirements
5. **Test your changes** thoroughly

### 4. Submit Your Work

1. **Create a Pull Request** with:
   - Clear title referencing the bounty number
   - Detailed description of changes made
   - Screenshots or demos if applicable
   - Link to the original issue: `Closes #issue-number`

2. **PR Template**:
   ```markdown
   ## Bounty Completion
   - **Issue**: #issue-number
   - **Bounty Title**: [Title of the bounty]
   - **Changes Made**: [Detailed description]
   - **Testing**: [How you tested your work]
   - **Screenshots/Demo**: [If applicable]
   
   ## Checklist
   - [ ] Code follows project style guidelines
   - [ ] Self-reviewed the code
   - [ ] Tested the functionality
   - [ ] Documentation updated (if needed)
   ```

### 5. Get Paid

Once your PR is merged:

1. **Automatic reward distribution** via DripsNetwork
2. **On-chain payment tracking** for transparency
3. **Reputation points** added to your profile
4. **Certificate of completion** for your portfolio

## 💰 Reward System

### Bounty Tiers

| Difficulty | Reward Range | Example Tasks |
|------------|--------------|---------------|
| 🌱 Beginner | 0.05-0.1 ETH | Documentation, simple fixes |
| 🚀 Intermediate | 0.1-0.3 ETH | Features, components |
| ⚡ Advanced | 0.3-0.5 ETH | Complex integrations |
| 🏆 Expert | 0.5+ ETH | Architecture, research |

### Payment Process

1. **PR Merged** → Automatic reward trigger
2. **DripsNetwork Stream** → 24-hour payment stream
3. **On-chain Record** → Transparent payment history
4. **Reputation Update** → Profile enhancement

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
├── frontend/          # Next.js application
├── backend/           # Express API server
├── shared/            # Shared types and utilities
├── scripts/           # DripsNetwork scripts
├── docs/              # Documentation
└── .github/           # Workflows and templates
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

- [Web3 Education](https://ethereum.org/en/developers/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Prisma Docs](https://www.prisma.io/docs/)

### DripsNetwork

- [DripsNetwork Documentation](https://docs.drips.network/)
- [Smart Contract Integration](https://docs.drips.network/smart-contracts)
- [Stream Management](https://docs.drips.network/streams)

## 🆘 Getting Help

### Support Channels

- **GitHub Discussions**: Ask questions and share ideas
- **Discord Community**: Real-time chat with contributors
- **Office Hours**: Weekly calls with maintainers
- **Documentation**: Comprehensive guides and API docs

### Common Issues

1. **Setup Problems**: Check environment configuration
2. **Database Issues**: Verify PostgreSQL connection
3. **Wallet Connection**: Ensure MetaMask is configured
4. **Payment Delays**: DripsNetwork may take 24 hours

## 📈 Impact Metrics

Your contributions help:

- 🎓 **Educate** thousands of Web3 learners
- 💰 **Distribute** $1000+ in monthly rewards
- 🌍 **Build** a global education community
- 🔓 **Democratize** access to Web3 knowledge

## 🎉 Thank You!

Every contribution helps make Web3 education more accessible and sustainable. We're excited to have you join our community of builders and educators!

---

**Ready to start?** [Browse Available Bounties](https://github.com/akordavid373/decentralized-education/issues?q=is%3Aissue+is%3Aopen+label%3Abounty) 🚀
