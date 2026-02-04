# User Management React Application

## Overview
This task requires building a React application for managing users. Users can be created, listed, searched, viewed, edited, and deleted. The app initializes with a default list of users stored in state management. Instead of using Zustand (as I don't used before), we will use Redux Toolkit (RTK) for state management(because I am an expert in it), as it provides similar capabilities for handling global state efficiently.

Tech Stack Used: React.js(+Redux Tool Kit), Tailwind CSS.

The application focuses on core React principles, including functional components, hooks, form handling, validation, and immutable state updates. No local state duplication is allowed—everything related to users must be managed globally via RTK.

## Technical Expectations and Rules
These are the mandatory rules and expectations for the implementation. Follow them strictly to ensure the app is clean, efficient, and error-free:

- **State Management (Mandatory)**: Use Redux Toolkit (RTK) for managing the user list and selected user. Do not duplicate global state in local components. Follow immutable update patterns (e.g., using RTK's createSlice and reducers to handle updates without mutating state directly).
- **React Components**: Use only React functional components. No class components.
- **Hooks**: Utilize React Hooks (e.g., useState, useEffect, useSelector, useDispatch from RTK) where appropriate.
- **Component Breakdown**: Break down the app into proper components, such as UserList, UserItem, UserForm, UserDetails, etc., for better organization and reusability.
- **Folder Structure**: Maintain a clean folder structure (e.g., src/components, src/store, src/utils, etc.).
- **Code Quality**: No unused variables, no console errors or warnings. Use proper keys when rendering lists (e.g., in map functions).
- **General Best Practices**: Ensure the app is responsive and user-friendly. Handle edge cases like empty lists or invalid inputs gracefully.

## What to Build: Step-by-Step Explanation

### Step 1: Set Up the Project
- Create a new React app using Create React App or Vite.
- Install necessary dependencies: React, Redux Toolkit (@reduxjs/toolkit), React Redux (@reduxjs/toolkit/react-redux), and any form libraries if needed (e.g., React Hook Form for better form handling, but optional).
- Configure RTK store: Set up a Redux store with a user slice that includes reducers for adding, updating, deleting users, and selecting a user.

### Step 2: Define User Data Structure
- Each user object should have the following fields:
  - Name (string)
  - Email (string)
  - Phone (string)
  - City (string)
  - Company name (string)
- Initialize the app with a default list of users in the RTK store (e.g., via an initial state in the user slice or a useEffect hook that dispatches an action to load defaults on app load).

### Step 3: Build the User List & Search View
- Create a main view that displays all users in a list or table format.
- Each row/item should show: Name, Email, City, Company name.
- Add a search input at the top that filters users in real-time by name or email (use RTK selectors to derive filtered list based on search term).
- Make each user item clickable to view details.
- Use RTK to fetch the user list from the global state.

### Step 4: Implement User Details View
- When a user is clicked, display details in a modal or side panel.
- Show all user fields: Name, Email, Phone, City, Company name.
- Use RTK to select and display the currently selected user from the store.
- Include options to edit or delete the user from this view.

### Step 5: Create & Edit User Form
- Build a reusable form component for both creating new users and editing existing ones.
- Use controlled inputs (managed via state/hooks).
- Implement basic validation:
  - All fields required.
  - Email must be valid (e.g., use regex or built-in validation).
- On submit:
  - For create: Dispatch an action to add the new user to the RTK store.
  - For edit: Dispatch an action to update the existing user in the RTK store.
- Differentiate between create and edit modes (e.g., pre-fill form with selected user data for edit).

### Step 6: Implement Delete User Functionality
- Add a delete option (e.g., button in details view).
- Show a confirmation dialog before deleting (e.g., using window.confirm or a custom modal).
- On confirmation, dispatch an action to remove the user from the RTK store.
- Update the list view automatically after deletion.

### Step 7: Integrate State Management Throughout
- Ensure all components interact with the RTK store:
  - Use useSelector to read state (e.g., users list, selected user).
  - Use useDispatch to dispatch actions (e.g., addUser, updateUser, deleteUser, selectUser).
- Maintain immutability: Use RTK's immutable patterns in reducers (e.g., return new arrays/objects).

### Step 8: Testing and Polish
- Test the app for all flows: create, list/search, view, edit, delete.
- Ensure real-time updates (e.g., list refreshes after create/edit/delete without page reload).
- Handle errors gracefully (e.g., show messages for validation failures).
- Make sure there are no performance issues or unnecessary re-renders.

This completes the requirements. The final app should be a fully functional user management tool demonstrating strong React and RTK skills.
