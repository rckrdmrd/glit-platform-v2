# GamificationPage - Quick Start Guide

## 🚀 Quick Integration

### Step 1: Add Route

Add the route to your React Router configuration:

```tsx
// In your router file (e.g., App.tsx or routes.tsx)
import GamificationPageComprehensive from '@/apps/student/pages/GamificationPageComprehensive';

// Add to your routes
<Route
  path="/student/gamification"
  element={<GamificationPageComprehensive />}
/>
```

### Step 2: Add Navigation Link

Add a link to your navigation menu:

```tsx
// In your navigation component
import { Trophy } from 'lucide-react';

<Link to="/student/gamification">
  <Trophy className="w-5 h-5" />
  <span>Gamificación</span>
</Link>
```

### Step 3: Test with Mock Data

The page automatically uses mock data in development when API calls fail. Simply navigate to `/student/gamification` to see it in action.

### Step 4: Connect to Real API

Update the API endpoints in the backend to match:
- `GET /api/gamification/ranks/user/:userId`
- `GET /api/gamification/coins/:userId`
- `GET /api/gamification/achievements/:userId?limit=6`
- `GET /api/gamification/leaderboard/user/:userId/position`
- `GET /api/gamification/missions/daily`
- `GET /api/gamification/streaks/:userId`

## 📁 File Structure

```
src/apps/student/
├── components/
│   └── gamification/
│       ├── GamificationHero.tsx          (387 lines)
│       ├── MLCoinsSection.tsx            (364 lines)
│       ├── RanksSection.tsx              (504 lines)
│       ├── AchievementsPreview.tsx       (276 lines)
│       ├── LeaderboardPreview.tsx        (342 lines)
│       ├── StreaksMissionsSection.tsx    (339 lines)
│       └── index.ts                      (12 lines)
├── hooks/
│   └── useGamificationData.ts            (325 lines)
└── pages/
    └── GamificationPageComprehensive.tsx (312 lines)
```

## 🎨 Customization

### Change Colors

Edit the Tailwind config or use CSS custom properties:

```tsx
// In your component
className="bg-gradient-to-br from-your-color-600 to-your-color-800"
```

### Modify Sections

Import and use individual components:

```tsx
import { GamificationHero, MLCoinsSection } from '@/apps/student/components/gamification';

// Use only what you need
<GamificationHero {...props} />
<MLCoinsSection data={mlCoins} />
```

### Adjust Animations

Modify animation properties in each component:

```tsx
// Example: Change animation duration
transition={{ duration: 0.8 }} // default is 0.5
```

## 🔧 Configuration

### Mock Data

To customize mock data, edit `/src/apps/student/hooks/useGamificationData.ts`:

```typescript
function getMockGamificationData(userId: string): GamificationData {
  return {
    // Your custom mock data here
  };
}
```

### API Client

The hook uses the global API client from `@/services/api/apiClient`. Ensure it's properly configured with:
- Base URL
- Authentication headers
- Error handling

## 🐛 Troubleshooting

### Issue: Page shows loading forever
**Solution**: Check console for API errors. The page should fallback to mock data automatically.

### Issue: Animations not smooth
**Solution**: Ensure Framer Motion is properly installed: `npm install framer-motion@12.23.24`

### Issue: Components not found
**Solution**: Check import paths match your project structure. Update the `@` alias in tsconfig.json if needed.

### Issue: Styling looks wrong
**Solution**: Ensure Tailwind CSS is configured with the detective theme colors in `tailwind.config.js`.

## 📱 Mobile Testing

Test on different screen sizes:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Use browser DevTools to simulate different devices.

## ✅ Checklist

Before going live:

- [ ] All API endpoints are connected
- [ ] Mock data is removed or hidden in production
- [ ] Error handling is tested
- [ ] Loading states work correctly
- [ ] All links navigate properly
- [ ] Responsive design tested on mobile
- [ ] Animations are smooth (60fps)
- [ ] Accessibility tested (keyboard navigation, screen readers)
- [ ] Performance tested (Lighthouse score)

## 🎯 Next Steps

1. **Integrate with existing auth system**
2. **Connect to real API endpoints**
3. **Add comprehensive error boundaries**
4. **Implement analytics tracking**
5. **Add E2E tests**
6. **Optimize performance**
7. **Add more interactive features**

## 📚 Additional Resources

- See `GAMIFICATION_PAGE_COMPREHENSIVE_REPORT.md` for detailed documentation
- Check component files for inline documentation
- Review TypeScript interfaces for data structures

## 💡 Tips

- Use the refresh button to reload data without page refresh
- All sections are independently reusable
- Mock data is comprehensive for testing
- Components are fully typed with TypeScript
- Animations can be disabled by removing Framer Motion props

---

**Need help?** Check the comprehensive report or examine the component source code for detailed implementation notes.
