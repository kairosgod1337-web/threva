# Trehva Landing Page Guidelines

## Brand Identity

### Color Palette
- **Primary Pink**: `#FFBDD6` - Used for backgrounds, cards, and accent elements
- **Primary Teal**: `#285361` - Used for text, buttons, and primary interactive elements
- **White**: `#FFFFFF` - Used for card backgrounds and contrast areas
- **Gradient**: `bg-gradient-to-b from-[#FFBDD6] to-[#FEFEFE]` - Applied to main content sections

### Typography
- **Font Family**: DM Sans throughout the application
- **Hero Headline**: 32px, medium weight
- **Solution Headline**: 48px, medium weight
- **Section Headlines**: 36px, medium weight
- **Body Text**: 18px, normal weight
- **Button Text**: Default size, medium weight

### Brand Name
- **Logo Text**: "Trehva" displayed at 30px with DM Sans font
- Always use proper capitalization: "Trehva" (not "TREHVA" or "trehva")

## Language & Localization

### Bilingual Support
- **Default Language**: Estonian (ET)
- **Secondary Language**: English (EN)
- Language switcher always visible in header with rounded pill design
- Active language has teal background (`bg-[#285361]`) with white text
- Inactive language has transparent background with teal text

### Translation Keys
- All user-facing text must use the `t` object from `useLanguage()` hook
- Never hardcode text strings in components
- All translation keys must exist in both Estonian and English in `LanguageContext.tsx`

## Component Structure

### Section Layout
- All major sections wrapped in `<section>` with consistent padding: `py-20 px-4`
- Container max-width: `max-w-5xl` for most sections, `max-w-4xl` for centered content
- Use `container mx-auto` for horizontal centering

### Cards
- Background: White (`bg-white`)
- Border radius: `rounded-2xl`
- Padding: `p-8`
- Shadow: `shadow-sm`
- Icon containers: 56px (w-14 h-14) with pink background and rounded-full

### Buttons
- **Primary CTA**: `bg-[#285361] text-white hover:bg-[#285361]/90`
- **Secondary/Outline**: `border-[#285361] text-[#285361]`
- Consistent padding: `px-8 py-6` for hero, `px-8` for forms
- Always use Button component from `./components/ui/button`

## Page Structure

### Header
- Fixed structure: Logo (left) + Partner link + Language switcher (right)
- Border bottom: `border-b border-[#285361]/10`
- Consistent padding: `py-6 px-4`

### Hero Section
- White background (`bg-white`)
- Single primary CTA button
- Centered text layout with `max-w-4xl` container
- Opens signup modal on CTA click

### Solution Section (Pink Background)
- Contains the main value proposition: "Kohalolust saab uus valuuta"
- 3 feature cards in grid layout (`grid md:grid-cols-3 gap-6`)
- Icons: Coins, Heart, Gift from lucide-react
- White cards on pink/gradient background

### Problem Section
- 3 statistics displayed in grid layout
- Icon containers with pink background
- Large numbers (40px) with descriptive labels below

### Early Access Section
- Pink card background (`bg-[#FFBDD6]`)
- Email input + Submit button in flex layout
- Clicking submit opens signup modal

### Footer
- Dark teal background (`bg-[#285361]`)
- White text
- Partner link, privacy, terms, contact links
- Copyright notice

## Modal Patterns

### Signup Modal
- Opens from: Hero CTA, Early Access form
- Fields: Name, Email, Family Size (dropdown), Children Ages, Phone, How Heard (dropdown), Privacy checkbox
- Validation: Requires privacy agreement checkbox
- Success message in Estonian or English based on active language

### Partner Modal
- Opens from: Header link, Footer link
- Fields: Business Name, Business Type (dropdown), Email, Phone, Website, Message (textarea)
- All business type options translated in both languages
- Success toast on submission

### Modal Styling
- Max width: `max-w-md`
- Max height: `max-h-[90vh]` with `overflow-y-auto`
- Input borders: `border-[#285361]/20`
- Button layout: Cancel (outline) + Submit (primary) in flex with gap

## Forms & Inputs

### Input Fields
- Use Input component from `./components/ui/input`
- Border color: `border-[#285361]/20`
- Text color: `text-[#285361]`
- Placeholder color: `placeholder:text-[#285361]/50`

### Select Dropdowns
- Use Select components from `./components/ui/select`
- Consistent styling with inputs
- All options translated in both languages

### Textareas
- Border: `border-[#285361]/20`
- Text color: `text-[#285361]`
- Disable resize: `resize-none`

## Icons

### Icon Library
- Use **lucide-react** for all icons
- Consistent icon sizes: `w-8 h-8` in stat containers, `w-7 h-7` in feature cards
- Icon color: Always `text-[#285361]`

### Common Icons Used
- Smartphone, Users, TrendingUp (Problem section)
- Coins, Heart, Gift (Solution section)
- CheckCircle (Trust section)

## Toast Notifications

- Use `toast` from `sonner@2.0.3`
- Success messages: `toast.success(t.successSignup)` or `toast.success(t.successPartner)`
- Error messages: `toast.error('Error message')`
- Always use translated strings for user-facing messages

## Responsive Design

### Breakpoints
- Mobile-first approach
- Use `md:` prefix for tablet/desktop layouts (768px+)
- Grid layouts: `grid md:grid-cols-3` for 3-column layouts
- Flex layouts: `flex flex-col sm:flex-row` for form elements

### Mobile Considerations
- Stack cards vertically on mobile
- Full-width buttons on mobile, inline on desktop
- Reduce padding on smaller screens where needed

## State Management

### Modal State
- Use `useState` hooks in App.tsx for modal open/close state
- Pass state and handlers as props: `isOpen` and `onClose`
- Reset form data on modal close

### Language State
- Managed by LanguageContext
- Default to Estonian ('et')
- Persist selection across page interactions

## Best Practices

### Don't
- Don't use Tailwind font size classes unless changing from defaults
- Don't hardcode text strings - always use translation keys
- Don't create inline styles - use Tailwind utility classes
- Don't use generic gray colors - use brand teal (`#285361`)
- Don't use multiple primary CTAs in the same section

### Do
- Use semantic HTML elements (section, header, footer)
- Keep components small and focused
- Extract reusable components to separate files
- Use consistent spacing (py-20 for sections, p-8 for cards)
- Test both languages to ensure translations fit properly
- Console.log form data on submission for debugging
- Show success toasts after form submissions
