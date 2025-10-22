# ActionsRef Integration - Quick Reference Card

## 5-Step Implementation Guide

### Step 1: Update Imports ⚡
```typescript
// BEFORE:
import React, { useState, useEffect } from 'react';

// AFTER:
import React, { useState, useEffect, useCallback } from 'react';

// BEFORE:
import type { ExerciseProps } from './types';

// AFTER:
import type { ExerciseProps, ExerciseState } from './types';
```

### Step 2: Destructure actionsRef 📥
```typescript
// BEFORE:
export const MyExercise: React.FC<ExerciseProps> = ({
  moduleId,
  lessonId,
  // ... other props
}) => {

// AFTER:
export const MyExercise: React.FC<ExerciseProps> = ({
  moduleId,
  lessonId,
  // ... other props
  actionsRef,  // ✅ ADD THIS
}) => {
```

### Step 3: Create getState Method 🔍
```typescript
// Add this function near your handlers
const getState = useCallback((): ExerciseState => {
  return {
    // Map your component state to ExerciseState interface
    field1: stateVar1,
    field2: stateVar2,
    score: score,
    timeSpent: timeSpent,
    hintsUsed: hintsUsed,
  };
}, [stateVar1, stateVar2, score, timeSpent, hintsUsed]);
```

### Step 4: Wrap Handlers with useCallback 🔁
```typescript
// BEFORE:
const handleReset = () => {
  // reset logic
};

// AFTER:
const handleReset = useCallback(() => {
  // reset logic
}, [dependencies]);

// BEFORE:
const handleValidate = async () => {
  // validate logic
};

// AFTER:
const handleValidate = useCallback(async () => {
  // validate logic
}, [dependencies]);
```

### Step 5: Populate actionsRef with useEffect 🎯
```typescript
// Add this useEffect
useEffect(() => {
  if (actionsRef) {
    actionsRef.current = {
      getState,
      reset: handleReset,
      validate: handleValidate,
      // Add exercise-specific methods if any
    };
  }

  return () => {
    if (actionsRef) {
      actionsRef.current = undefined;
    }
  };
}, [actionsRef, getState, handleReset, handleValidate]);
```

---

## Common Patterns

### For Chat/Messaging Exercises
```typescript
actionsRef.current = {
  getState,
  reset: handleReset,
  validate: handleValidate,
  sendMessage: handleSendMessage, // ✅ Exercise-specific
};
```

### For Recording Exercises
```typescript
actionsRef.current = {
  getState,
  reset: handleReset,
  validate: handleValidate,
  startRecording: handleStartRecording, // ✅ Exercise-specific
  stopRecording: handleStopRecording,
};
```

### For Interactive/Puzzle Exercises
```typescript
actionsRef.current = {
  getState,
  reset: handleReset,
  validate: handleValidate,
  movePiece: handleMovePiece, // ✅ Exercise-specific
};
```

---

## Checklist Before Committing ✓

- [ ] Imported `useCallback` from React
- [ ] Imported State type from types file
- [ ] Destructured `actionsRef` from props
- [ ] Created `getState` method with useCallback
- [ ] Wrapped `handleReset` with useCallback (if not already)
- [ ] Wrapped `handleValidate` with useCallback (if not already)
- [ ] Added useEffect to populate actionsRef
- [ ] Added cleanup in useEffect return
- [ ] Included all methods defined in Actions interface
- [ ] Tested getState returns correct state
- [ ] Tested reset works
- [ ] Tested validate works

---

## Reference Implementation

**DetectiveTextualExercise.tsx** is the complete reference:
```
/home/isem/workspace/glit-platform-v2/src/features/mechanics/module2/DetectiveTextual/DetectiveTextualExercise.tsx
```

Study lines:
- Line 1: Import useCallback
- Line 25: Import State type
- Line 40: Destructure actionsRef
- Line 193-206: handleReset with useCallback
- Line 209-218: getState method
- Line 221-237: useEffect populating actionsRef

---

## Testing Your Implementation

### Quick Test
```typescript
// Create a test parent component
function TestParent() {
  const ref = useRef<YourExerciseActions | undefined>();

  useEffect(() => {
    // Test after mount
    console.log('State:', ref.current?.getState());

    // Test reset
    setTimeout(() => ref.current?.reset(), 2000);

    // Test validate
    setTimeout(() => ref.current?.validate(), 4000);
  }, []);

  return (
    <YourExercise
      moduleId={2}
      lessonId={1}
      exerciseId="test"
      userId="test-user"
      actionsRef={ref}
    />
  );
}
```

### Verify These Work:
1. ✅ ref.current is populated after mount
2. ✅ getState() returns current state
3. ✅ reset() resets the exercise
4. ✅ validate() triggers validation
5. ✅ ref.current is undefined after unmount

---

## Common Mistakes to Avoid ⚠️

### ❌ Don't Do This:
```typescript
// Missing useCallback
const getState = () => ({ ...state }); // ❌ Will cause infinite loop

// Wrong cleanup
return () => {
  actionsRef.current = null; // ❌ Should be undefined
};

// Missing dependencies
useEffect(() => {
  actionsRef.current = { getState, reset, validate };
}, []); // ❌ Missing dependencies

// Forgetting to destructure actionsRef
const MyExercise = ({ moduleId, lessonId }) => { // ❌ Missing actionsRef
```

### ✅ Do This Instead:
```typescript
// Use useCallback
const getState = useCallback(() => ({ ...state }), [state]); // ✅

// Correct cleanup
return () => {
  if (actionsRef) {
    actionsRef.current = undefined; // ✅
  }
};

// Include all dependencies
useEffect(() => {
  if (actionsRef) {
    actionsRef.current = { getState, reset, validate };
  }
}, [actionsRef, getState, reset, validate]); // ✅

// Destructure actionsRef
const MyExercise = ({ moduleId, lessonId, actionsRef }) => { // ✅
```

---

## Time Estimates

### Per Exercise:
- Reading existing code: 5-10 min
- Adding imports: 1 min
- Creating getState: 5-10 min
- Wrapping handlers: 5 min
- Adding useEffect: 3 min
- Testing: 10-15 min

**Total: 30-45 minutes per exercise**

### For All 18 Remaining:
- Optimistic: 9 hours
- Realistic: 12 hours
- Conservative: 15 hours

---

## Need Help?

1. Check the reference implementation: **DetectiveTextualExercise.tsx**
2. Review the type file for your exercise
3. Check **ACTIONSREF_INTEGRATION_REPORT.md** for details
4. Verify types match between Actions interface and implementation

---

*Quick Reference v1.0 - Ready to implement!*
