# iCinema Frontend - AI Coding Instructions

## Project Overview

iCinema is a movie ticket booking platform (React 19 + TypeScript). Users browse movies, select theatres/shows, choose seats, and complete mock payments.

## Architecture & Folder Structure

```
src/
  components/    # Reusable UI: Navbar, Footer, MovieCard, MovieCarousel, MovieFilterBar, SeatGrid, BookingSummary, PaymentForm
  models/        # TypeScript interfaces: Movie, Show, Seat, Theatre, BookingSummary, Payment
  pages/         # Route pages: HomePage, MoviesPage, MovieDetailsPage, SeatSelectionPage, PaymentPage, TicketPage
```

## Routes Configuration

| Route            | Page              | Description                                                    |
| ---------------- | ----------------- | -------------------------------------------------------------- |
| `/`              | HomePage          | Hero carousel, tags, Now Showing, Deals, Theatre Experience    |
| `/movies`        | MoviesPage        | Search, filters (genre/language/rating), pagination            |
| `/movies/:id`    | MovieDetailsPage  | Movie info, rating, theatre/show selection, ticket count modal |
| `/seats/:showId` | SeatSelectionPage | BookMyShow-style seat grid, booking summary                    |
| `/payment`       | PaymentPage       | Card selection (credit/debit), discounts, payment form         |
| `/ticket`        | TicketPage        | Confirmation with downloadable ticket                          |

## Coding Conventions

### Styling - Bootstrap Only

- Use **only Bootstrap classes** (`container`, `row`, `col`, `card`, `carousel`, etc.)
- Use **React-Bootstrap** components (`<Container>`, `<Row>`, `<Col>`, `<Card>`)
- **NO custom CSS files** - removed App.css and index.css imports
- **NO Tailwind, Material UI, or other UI frameworks**
- Dark theme: `bg-dark`, `text-white`, `border-secondary`

### State Management - Keep It Simple

- Use `useState` for local state (movies, seats, selectedSeats, totalPrice)
- Pass data via `react-router-dom` location state between pages
- **NO Redux, Zustand, or Context API**

### API Calls - Direct Axios in Components

```tsx
// Example pattern - call axios directly in useEffect with mock fallback
useEffect(() => {
  axios
    .get("http://localhost:8080/movies/allMovies")
    .then((res) => setMovies(res.data))
    .catch(() => setMovies(mockMovies)); // Fallback for dev
}, []);
```

- **NO service layer folders** - keep axios calls inline in components
- Backend runs on `http://localhost:8080`

## Key Backend API Endpoints

| Endpoint                                        | Purpose                    |
| ----------------------------------------------- | -------------------------- |
| `GET /movies/allMovies`                         | List all movies            |
| `GET /movies/{id}`                              | Movie details              |
| `GET /movies/search?name=`                      | Search movies              |
| `GET /movies/filter?genre=&language=&rating=`   | Filter movies              |
| `GET /api/seating/movie/{movieId}`              | Theatres + shows for movie |
| `GET /api/seating/show/{showId}/seats`          | Seat layout                |
| `GET /api/seating/show/{showId}/pricing?seats=` | Price calculation          |
| `POST /api/payment/pay`                         | Process payment            |
| `POST /api/rating/rate`                         | Submit rating              |

## UI/UX Patterns

### Seat Selection Grid (BookMyShow-style)

- Green (`bg-success`) = Available
- Blue (`bg-info`) = Premium
- Yellow (`bg-warning`) = Selected
- Gray (`bg-secondary`) = Booked

### Payment Discounts

- Credit Card → 10% discount
- Debit Card → 5% discount

### Ticket Download

- Uses `html2canvas` to generate downloadable PNG ticket

## Commands

- `npm start` - Dev server on http://localhost:3000
- `npm test` - Run tests
- `npm run build` - Production build

## Dependencies (Already Installed)

```bash
npm install react-bootstrap bootstrap axios react-router-dom @types/react-router-dom html2canvas
```

Bootstrap CSS imported in `index.tsx`:

```tsx
import "bootstrap/dist/css/bootstrap.min.css";
```

```bash
npm install react-bootstrap bootstrap axios react-router-dom @types/react-router-dom
```

Then import Bootstrap CSS in `index.tsx`:

```tsx
import "bootstrap/dist/css/bootstrap.min.css";
```
