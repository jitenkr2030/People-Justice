# 🏛️ People's Justice

**Affordable Legal Empowerment for Every Indian**

A comprehensive mobile-first Progressive Web App (PWA) that provides Indian citizens with accessible legal tools and guidance. Built with Next.js 16, TypeScript, and Tailwind CSS.

**Price:** ₹99 (One-time)  
**Target Users:** Common citizens, workers, women, senior citizens, students, rural users  
**Mission:** *Make law simple, accessible, and usable for people without lawyers.*

---

## ✨ Features

### 🏛️ Core Legal Modules

#### 1. **RTI Generator**
- Pre-built RTI templates by category (Land Records, Government Schemes, Education, Health, etc.)
- Department auto-selection (Central & State)
- Hindi & English support
- Step-by-step guided form with 5 steps
- PDF-ready RTI format generation
- Draft saving functionality
- Timeline reminders and submission guidelines

#### 2. **Know Your Rights**
- 6 comprehensive rights categories (Labour, Women, Police, Tenant, Consumer, Senior Citizens)
- Simple "Do/Don't" explanations
- Real-life examples for each right
- Audio support for illiterate users
- Emergency rights quick access
- Bookmark and save functionality

#### 3. **Legal Notice Generator**
- 6 template categories (Salary Payment, Refund Denial, Rent Disputes, etc.)
- Professional legal notice structure
- Customizable content with form validation
- PDF export and sharing capabilities
- Clear legal disclaimers
- Step-by-step guidance

#### 4. **Consumer Complaint**
- 8 complaint categories (E-commerce, Payments, Electronics, etc.)
- Company-level complaint drafts
- Evidence checklist and documentation
- Consumer forum complaint templates
- Step-by-step complaint timeline
- Filing guidelines and support

#### 5. 🚨 **NyayRakshak** - BNS 2023 Legal Safety
- **Situation Analyzer**: Identify BNS sections and risk levels
- **Police Interaction Guide**: What police can & cannot do
- **Emergency Mode**: Arrest & notice safety protocols
- **Legal Risk Meter**: Visual risk assessment (🟢🟡🔴)
- **Complaint Generator**: Ready-to-use legal drafts
- **Evidence Checklist**: Digital and physical evidence preservation
- **Rights Library**: Comprehensive BNS and BNSS rights

---

## 🌟 Additional Features

- **📱 Mobile-First PWA**: App-like experience on mobile devices
- **🌐 Language Support**: Hindi & English with persistent preferences
- **♿ Accessibility**: Screen reader support, large text mode, keyboard navigation
- **🔒 Privacy & Security**: No data sharing, no mandatory login, local storage
- **📴 Offline Mode**: Core functionality available without internet
- **💾 Local Storage**: Draft saving and preference persistence
- **🎯 Touch-Friendly**: Optimized for mobile interactions

---

## 🛠️ Technology Stack

### Core Framework
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **State Management**: React hooks and Context API

### UI/UX
- **Components**: shadcn/ui component library
- **Icons**: Lucide React
- **Forms**: React Hook Form with validation
- **Animations**: Framer Motion transitions

### PWA Features
- **Service Worker**: Offline caching and background sync
- **Manifest**: App installation and shortcuts
- **Responsive Design**: Mobile-first approach

### Development Tools
- **Package Manager**: Bun
- **Linting**: ESLint with Next.js configuration
- **Type Checking**: Strict TypeScript

---

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- Bun package manager

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/jitenkr2030/People-Justice.git
   cd People-Justice
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Run development server**
   ```bash
   bun run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🚀 Usage

### For Users

1. **Open the app** on any device (mobile recommended)
2. **Choose your language** (Hindi/English)
3. **Select a module** based on your legal need
4. **Follow step-by-step guidance** for your specific situation
5. **Generate documents** or **get legal guidance** instantly

### For Developers

```bash
# Development
bun run dev          # Start development server
bun run lint          # Run ESLint
bun run build        # Build for production

# Database (if using)
bun run db:push      # Push schema to database
bun run db:generate  # Generate Prisma client
```

---

## 📱 PWA Installation

### On Mobile
1. Open the app in Chrome/Safari
2. Tap "Add to Home Screen"
3. Confirm installation

### On Desktop
1. Open the app in Chrome
2. Click the install icon in the address bar
3. Confirm installation

---

## 🏗️ Project Structure

```
people-justice/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx       # Root layout with providers
│   │   ├── page.tsx         # Main home page
│   │   └── globals.css      # Global styles
│   ├── components/           # Reusable components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── RTIGenerator.tsx # RTI Module
│   │   ├── KnowYourRights.tsx
│   │   ├── LegalNoticeGenerator.tsx
│   │   ├── ConsumerComplaint.tsx
│   │   └── NyayRakshak.tsx  # BNS Safety Module
│   ├── contexts/            # React contexts
│   │   └── LanguageContext.tsx
│   ├── lib/                 # Utility functions
│   │   └── serviceWorker.ts
│   └── types/               # TypeScript definitions
├── public/                  # Static assets
│   ├── manifest.json        # PWA manifest
│   ├── sw.js               # Service worker
│   └── icons/              # App icons
├── prisma/                 # Database schema
└── docs/                   # Documentation
```

---

## ⚖️ Legal & Compliance

### Disclaimer
> People's Justice provides legal information and document assistance, not legal advice. For complex matters, consult a qualified lawyer.

### Compliance
- No impersonation of legal professionals
- No court representation claims
- Consumer protection friendly
- Based on Indian laws including BNS 2023

### Data Privacy
- No data sharing with third parties
- No mandatory login required
- Local storage for documents
- Anonymous mode available

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint configuration
- Test on mobile devices
- Ensure accessibility compliance
- Write clear commit messages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful UI components
- **Tailwind CSS** for utility-first styling
- **Lucide** for consistent iconography
- **Next.js** for the powerful framework
- **Indian Legal Community** for domain expertise

---

## 📞 Support

### For Users
- **Email**: support@peoplesjustice.app
- **Help**: In-app help section
- **Emergency**: Dial 112 for immediate police assistance

### For Developers
- **Issues**: [GitHub Issues](https://github.com/jitenkr2030/People-Justice/issues)
- **Discussions**: [GitHub Discussions](https://github.com/jitenkr2030/People-Justice/discussions)
- **Documentation**: [Wiki](https://github.com/jitenkr2030/People-Justice/wiki)

---

## 🗺️ Roadmap

### Upcoming Features
- [ ] Regional language support (Marathi, Tamil, Bengali, etc.)
- [ ] AI-powered legal assistant
- [ ] Verified lawyer directory
- [ ] Case tracking system
- [ ] Document storage vault
- [ ] Video consultation platform
- [ ] Legal news and updates
- [ ] Community forum

### Technical Improvements
- [ ] Enhanced offline capabilities
- [ ] Real-time collaboration
- [ ] Advanced analytics
- [ ] Performance optimizations
- [ ] Security enhancements

---

## 📈 Impact

**People's Justice** aims to:
- ✅ Democratize access to legal information
- ✅ Reduce fear of legal processes
- ✅ Enable self-help legal actions
- ✅ Provide affordable legal empowerment
- ✅ Bridge the justice gap in India

**Every citizen deserves access to justice. People's Justice makes it possible.**

---

<div align="center">

**⭐ Star this repository if it helped you!**

**🔗 Share with others who might need legal assistance**

**💝 Made with ❤️ for the people of India**

</div>