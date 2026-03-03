# Staked Aura

A DeFi staking platform with built-in governance. Users can stake tokens, earn rewards, and vote on protocol decisions through a DAO.

## What It Does

**Staking**
- Stake AURA tokens to earn rewards
- Rewards are calculated per second based on staked amount and time
- Claim rewards anytime

**Governance**
- Token holders can create proposals
- Vote on proposals (for/against)
- Passed proposals can modify protocol parameters or transfer treasury funds

**Treasury**
- Holds protocol funds
- Only the DAO can authorize transfers

## Contracts

| Contract | Purpose |
|---------|---------|
| `AuraToken.sol` | ERC20 token with voting power |
| `AuraStaking.sol` | Staking and reward distribution |
| `AuraGovernor.sol` | DAO voting system |
| `AuraTreasury.sol` | Protocol fund management |

## Tech Stack

**Contracts:** Solidity 0.8.20, Foundry, OpenZeppelin

**Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Wagmi

## Get Started

```bash
# Frontend
npm install
npm run dev

# Contracts
forge build
forge test
```

## Security

- ReentrancyGuard on state-changing functions
- CEI pattern (Checks-Effects-Interactions)
- SafeERC20 for token transfers
- Custom errors for gas efficiency

---

Built with Solidity + React.
