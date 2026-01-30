# 📝 Quick Git Reference Card

## Status: Git Not Installed ⚠️

Git needs to be installed first. Here's the quickest path:

---

## 3-Minute Quick Start

### 1. Download & Install Git
- **Windows:** https://git-scm.com/download/win
- **macOS:** `brew install git`
- **Linux:** `sudo apt-get install git`

### 2. After Installation, Open PowerShell

```powershell
# Set up your identity (one time)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### 3. Initialize Your Project

```powershell
cd "C:\Users\vaibh\OneDrive\Desktop\hackshastar"
git init
git add .
git commit -m "Initial commit: Indian Classical Dance Learning Platform"
```

### 4. Create Repo on GitHub

- Go to: https://github.com/new
- Create repository (name: `indian-dance-learning`)
- Copy the URL

### 5. Connect & Push

```powershell
# Replace USERNAME/REPO_NAME with your details
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

Done! ✅

---

## Essential Commands

| Command | Purpose |
|---------|---------|
| `git init` | Initialize repo |
| `git add .` | Stage all files |
| `git commit -m "msg"` | Create commit |
| `git remote add origin URL` | Connect to GitHub |
| `git push` | Upload to GitHub |
| `git status` | Check status |
| `git log` | View history |

---

## Files to Push

✅ All source code  
✅ All documentation  
✅ index.html (updated UI)  
✅ src/ folder (all modules)  
✅ .gitignore (already configured)  
✅ package.json  

❌ node_modules/ (ignored)  
❌ .env files (ignored)  

---

## Your Repository Files

```
📦 indian-dance-learning
├── 📄 index.html
├── 📄 package.json
├── 📄 README.md
├── 📄 QUICKSTART.md
├── 📄 SETUP.md
├── 📄 PROJECT_SUMMARY.md
├── 📄 CHANGELOG.md
├── 📄 UI_DESIGN_GUIDE.md
├── 📄 UI_UPDATE.md
├── 📄 UI_SUMMARY.md
├── 📄 GIT_SETUP_GUIDE.md
├── 📁 src/
│   ├── app.js
│   ├── utils/
│   ├── data/
│   └── styles/
├── 📁 public/
└── 📄 .gitignore
```

---

## Next: When Ready to Push

```powershell
# Navigate to project
cd "C:\Users\vaibh\OneDrive\Desktop\hackshastar"

# Check everything
git status

# If status shows files, you're ready:
git add .
git commit -m "Add Indian Dance Learning Platform"
git push

# Done!
```

---

See **GIT_SETUP_GUIDE.md** for detailed instructions.

**Install Git first, then we can push your code!** 🚀
