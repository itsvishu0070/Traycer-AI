export const loginPlan = {
  name: 'login-plan',
  suggestedTechStack: ['React', 'Express', 'Node.js', 'MongoDB', 'Mongoose', 'bcryptjs', 'jsonwebtoken'],
  nodes: [
    {
      id: '0',
      position: { x: 175, y: -100 },
      data: {
        step: 0,
        label: 'Project Folder Structure',
        status: 'Completed',
        icon: '📁',
        description: 'This is the recommended folder structure for a MERN stack project. The client and server are separated for clean organization.',
        code: `
📁 my-auth-app/
├── 📁 client/
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   ├── 📁 hooks/
│   │   ├── 📁 context/
│   │   │   └── 📄 AuthContext.tsx
│   │   └── 📁 pages/
├── 📁 server/
│   ├── 📁 config/
│   ├── 📁 controllers/
│   │   └── 📄 userController.js
│   ├── 📁 middleware/
│   │   └── 📄 authMiddleware.js
│   ├── 📁 models/
│   │   └── 📄 User.js
│   └── 📁 routes/
│       └── 📄 userRoutes.js
└── 📄 package.json
        `
      },
    },
    {
      id: '1',
      position: { x: 0, y: 0 },
      data: {
        step: 1,
        label: 'Setup & Install Dependencies',
        status: 'Completed',
        icon: '📦',
        description: 'Initialize the project and install all necessary backend packages like Express, Mongoose for database modeling, bcryptjs for password hashing, and jsonwebtoken for session management.',
        code: `// Run in your /server directory\nnpm install express mongoose bcryptjs jsonwebtoken dotenv`
      },
    },
    {
      id: '2',
      position: { x: 350, y: 0 },
      data: {
        step: 2,
        label: 'Define User Schema & Model',
        status: 'Completed',
        icon: '🗄️',
        description: 'Create a robust Mongoose schema for the User. Include fields for name, email, and password, and add a pre-save hook to automatically hash the password before saving a new user.',
        code: `import mongoose from 'mongoose';\nimport bcrypt from 'bcryptjs';\n\nconst userSchema = new mongoose.Schema({\n  name: { type: String, required: true },\n  email: { type: String, required: true, unique: true },\n  password: { type: String, required: true },\n}, { timestamps: true });\n\n// Hash password before saving\nuserSchema.pre('save', async function (next) {\n  if (!this.isModified('password')) return next();\n  const salt = await bcrypt.genSalt(10);\n  this.password = await bcrypt.hash(this.password, salt);\n});\n\nexport default mongoose.model('User', userSchema);`
      },
    },
    {
      id: '3',
      position: { x: 0, y: 200 },
      data: {
        step: 3,
        label: 'Create Signup API Endpoint',
        status: 'In Progress',
        icon: '➕',
        description: 'Build the user registration route. It will validate input, check if a user with the same email already exists, and save the new user to the database.',
        code: `// POST /api/users/register\nconst registerUser = async (req, res) => {\n  const { name, email, password } = req.body;\n\n  const userExists = await User.findOne({ email });\n  if (userExists) {\n    return res.status(400).json({ message: 'User already exists' });\n  }\n\n  const user = await User.create({ name, email, password });\n\n  if (user) {\n    res.status(201).json({ _id: user._id, name: user.name, email: user.email });\n  } else {\n    res.status(400).json({ message: 'Invalid user data' });\n  }\n};`
      },
    },
    {
      id: '4',
      position: { x: 350, y: 200 },
      data: {
        step: 4,
        label: 'Create Login Endpoint & JWT',
        status: 'In Progress',
        icon: '🔑',
        description: 'Build the user login route. It will find the user by email, compare the provided password with the hashed password in the DB, and generate a JSON Web Token (JWT) on success.',
        code: `// POST /api/users/login\nconst loginUser = async (req, res) => {\n  const { email, password } = req.body;\n  const user = await User.findOne({ email });\n\n  if (user && (await bcrypt.compare(password, user.password))) {\n    res.json({\n      _id: user._id,\n      name: user.name,\n      token: generateToken(user._id),\n    });\n  } else {\n    res.status(401).json({ message: 'Invalid email or password' });\n  }\n};\n\n// Helper function to generate JWT\nconst generateToken = (id) => {\n  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });\n};`
      },
    },
    {
      id: '5',
      position: { x: 0, y: 400 },
      data: {
        step: 5,
        label: 'Create Auth Middleware',
        status: 'Pending',
        icon: '🛡️',
        description: 'Write middleware for Express to protect private API routes. This function will check for a valid JWT in the request headers and attach the user object to the request.',
        code: `import jwt from 'jsonwebtoken';\nimport User from '../models/User.js';\n\nconst protect = async (req, res, next) => {\n  let token;\n  if (req.headers.authorization?.startsWith('Bearer')) {\n    try {\n      token = req.headers.authorization.split(' ')[1];\n      const decoded = jwt.verify(token, process.env.JWT_SECRET);\n      req.user = await User.findById(decoded.id).select('-password');\n      next();\n    } catch (error) {\n      res.status(401).json({ message: 'Not authorized, token failed' });\n    }\n  } // ... handle no token\n};`
      },
    },
    {
      id: '6',
      position: { x: 350, y: 400 },
      data: {
        step: 6,
        label: 'Build Frontend Auth UI',
        status: 'Pending',
        icon: '🎨',
        description: 'Create the React components for the Login and Signup forms. Implement state management for form inputs, loading states, and error messages from the API.',
        code: `function LoginPage() {\n  const [email, setEmail] = useState('');\n  const [password, setPassword] = useState('');\n  const [loading, setLoading] = useState(false);\n  const [error, setError] = useState('');\n\n  const submitHandler = async (e) => {\n    e.preventDefault();\n    setLoading(true);\n    try {\n      // call login api\n    } catch (err) {\n      setError(err.response.data.message);\n    }\n    setLoading(false);\n  };\n  // ... return form JSX with loading spinner and error display\n}`
      },
    },
    {
      id: '7',
      position: { x: 175, y: 600 },
      data: {
        step: 7,
        label: 'Implement Frontend Protected Routes',
        status: 'Pending',
        icon: '🔒',
        description: 'Use a global state (like React Context) to manage the user\'s authentication status. Create a wrapper component that checks if a user is logged in before rendering private pages.',
        code: `// Example AuthContext.js\nconst AuthContext = React.createContext();\n\n// Example ProtectedRoute.js\nfunction ProtectedRoute({ children }) {\n  const { userInfo } = useContext(AuthContext);\n  return userInfo ? children : <Navigate to="/login" />;\n}\n\n// In App.js\n<Routes>\n  <Route path="/login" element={<LoginPage />} />\n  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />\n</Routes>`
      },
    }
  ],
  edges: [
    { id: 'e0-1', source: '0', target: '1', animated: true },
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    { id: 'e2-4', source: '2', target: '4', animated: true },
    { id: 'e4-5', source: '4', target: '5', animated: true },
    { id: 'e3-6', source: '3', target: '6', animated: true },
    { id: 'e4-6', source: '4', target: '6', animated: true },
    { id: 'e5-7', source: '5', target: '7', animated: true },
  ],
};

