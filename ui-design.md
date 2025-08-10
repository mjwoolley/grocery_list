# UI Design Specification

## Design Philosophy
- **Google-style simplicity**: Clean, minimal interface with plenty of whitespace
- **Mobile-first**: Optimized for phone usage with touch-friendly elements
- **Real-time feedback**: Immediate visual updates for all actions

## Color Palette
```
Primary: #1976d2 (Material Blue)
Secondary: #dc004e (Material Pink)
Background: #f5f5f5 (Light Gray)
Surface: #ffffff (White)
Text Primary: #212121 (Dark Gray)
Text Secondary: #757575 (Medium Gray)
Success: #4caf50 (Green)
Error: #f44336 (Red)
```

## Typography
- **Headers**: Roboto, 600 weight
- **Body**: Roboto, 400 weight
- **Buttons**: Roboto, 500 weight

## Screen Layouts

### 1. Authentication Screen
```
┌─────────────────────┐
│                     │
│    🛒 Grocery       │
│       List          │
│                     │
│  ┌───────────────┐  │
│  │ Email         │  │
│  └───────────────┘  │
│                     │
│  ┌───────────────┐  │
│  │ Password      │  │
│  └───────────────┘  │
│                     │
│  ┌─────────────────┐│
│  │   SIGN IN       ││
│  └─────────────────┘│
│                     │
│    Need an account? │
│      Sign Up        │
│                     │
└─────────────────────┘
```

**Components:**
- App logo/icon at top
- Email input field (outlined)
- Password input field (outlined, with show/hide toggle)
- Primary action button (SIGN IN)
- Secondary link (Sign Up)
- Form validation messages below fields

### 2. Main Grocery List Screen
```
┌─────────────────────┐
│ Grocery List    👤  │ <- Header with logout
├─────────────────────┤
│                     │
│ ┌─────────────────┐ │ <- Add item section
│ │ Add new item... │+│
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │ <- Active items
│ │ ☐ Milk          │ │
│ │ ☐ Bread         │ │
│ │ ☐ Apples        │ │
│ │ ☐ Chicken       │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │ <- Purchased section
│ │ Purchased (3)   │ │
│ │ ✓ Eggs          │ │
│ │ ✓ Butter        │ │
│ │ ✓ Bananas       │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │ <- Clear button
│ │ Clear Purchased │ │
│ └─────────────────┘ │
│                     │
└─────────────────────┘
```

**Header:**
- App title on left
- User avatar/menu on right for logout

**Add Item Section:**
- Text input with placeholder "Add new item..."
- Plus button or Enter key to add
- Focus on input when screen loads

**Active Items List:**
- Each item as a card/row
- Checkbox on left (unchecked)
- Item name in center
- Tap anywhere to check off item

**Purchased Items Section:**
- Collapsible section with count
- Grayed out text
- Checkmarks instead of empty boxes
- Items fade or animate when moved here

**Clear Button:**
- Only visible when purchased items exist
- Confirmation dialog before clearing

### 3. Empty State
```
┌─────────────────────┐
│ Grocery List    👤  │
├─────────────────────┤
│                     │
│ ┌─────────────────┐ │
│ │ Add new item... │+│
│ └─────────────────┘ │
│                     │
│       🛒            │
│                     │
│   Your grocery      │
│   list is empty     │
│                     │
│   Add your first    │
│   item above        │
│                     │
└─────────────────────┘
```

## Component Specifications

### Item Card/Row
- **Height**: 56px minimum
- **Padding**: 16px horizontal, 12px vertical
- **Background**: White with subtle shadow
- **Border Radius**: 8px
- **Margin**: 4px between items

### Checkbox
- **Size**: 24px
- **Touch target**: 48px minimum
- **Color**: Primary blue when checked
- **Animation**: Smooth check animation

### Input Field
- **Height**: 56px
- **Border**: 1px solid #e0e0e0
- **Border Radius**: 4px
- **Focus**: Primary blue border
- **Placeholder**: Medium gray text

### Buttons
- **Primary**: Filled, primary color, 48px height
- **Secondary**: Outlined, primary color, 48px height
- **Text**: No background, primary color text

## Responsive Behavior

### Mobile (< 600px)
- Single column layout
- Full width components
- 16px side margins
- Touch-optimized 48px tap targets

### Tablet (600px - 960px)
- Centered layout with max-width 600px
- Same mobile components
- Larger margins on sides

### Desktop (> 960px)
- Centered layout with max-width 400px
- Same mobile-first design
- Even larger side margins

## Animations & Interactions

### Adding Items
1. User types in input field
2. Press Enter or tap + button
3. Item animates into list from top
4. Input field clears and refocuses

### Checking Off Items
1. User taps checkbox or item row
2. Checkbox animates to checked state
3. Item slides down to purchased section
4. Counter updates with animation

### Real-time Updates
1. New items from other user slide in from top
2. Checked items from other user move smoothly
3. Subtle notification indicator for changes

### Error States
- Form validation errors appear below inputs
- Network errors show as snackbar notifications
- Loading states show skeleton placeholders

## Accessibility
- Semantic HTML structure
- ARIA labels for all interactive elements
- High contrast colors (AA compliant)
- Keyboard navigation support
- Screen reader friendly
- Focus indicators on all interactive elements

## Performance Considerations
- Lazy loading for large lists
- Virtual scrolling if needed (100+ items)
- Optimistic UI updates
- Offline-first approach for future enhancement