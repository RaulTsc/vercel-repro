import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../store";
import { prismApi } from "../../helpers/api";
import { IReview } from "../../interfaces";

interface ISliceState {
  loading: boolean;
  reviews: IReview[];
  review: IReview | null;
  error: string | null;
}

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    loading: false,
    review: null,
    reviews: [],
    error: null,
  } as ISliceState,
  reducers: {
    getReviewsStart(state) {
      state.loading = true;
    },
    getReviewsSuccess(state, action: PayloadAction<IReview[]>) {
      state.loading = false;
      state.reviews = action.payload;
    },
    getReviewsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    getReviewStart(state) {
      state.loading = true;
    },
    getReviewSuccess(state, action: PayloadAction<IReview>) {
      state.loading = false;
      state.review = action.payload;
    },
    getReviewFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteReviewStart(state) {
      state.loading = true;
    },
    deleteReviewSuccess(state) {
      state.loading = false;
    },
    deleteReviewFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateReviewStart(state) {
      state.loading = true;
    },
    updateReviewSuccess(state) {
      state.loading = false;
    },
    updateReviewFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const getReview = (
  reviewId: string
): AppThunk<Promise<IReview | null>> => async (
  dispatch
): Promise<IReview | null> => {
  try {
    dispatch(reviewsSlice.actions.getReviewStart());
    const response = await prismApi.get(`/companies/me/reviews/${reviewId}`);
    const review: IReview = await response.json();
    dispatch(reviewsSlice.actions.getReviewSuccess(review));
    return review;
  } catch (err) {
    dispatch(reviewsSlice.actions.getReviewFailure(err));
    return null;
  }
};

export const updateReview = (
  review: IReview
): AppThunk<Promise<void>> => async (dispatch): Promise<void> => {
  try {
    dispatch(reviewsSlice.actions.updateReviewStart());
    await prismApi.patch(`/companies/me/reviews/${review.id}`, review);
    dispatch(reviewsSlice.actions.updateReviewSuccess());
  } catch (err) {
    dispatch(reviewsSlice.actions.updateReviewFailure(err));
  }
};

export const deleteReview = (
  review: IReview
): AppThunk<Promise<void>> => async (dispatch): Promise<void> => {
  try {
    dispatch(reviewsSlice.actions.deleteReviewStart());
    await prismApi.delete(`/companies/me/reviews/${review.id}`);
    dispatch(reviewsSlice.actions.deleteReviewSuccess());
  } catch (err) {
    dispatch(reviewsSlice.actions.deleteReviewFailure(err));
  }
};

export const getReviews = (): AppThunk<Promise<void>> => async (
  dispatch
): Promise<void> => {
  try {
    dispatch(reviewsSlice.actions.getReviewsStart());
    const response = await prismApi.get("/public/me/reviews");
    const reviews: IReview[] = await response.json();
    dispatch(reviewsSlice.actions.getReviewsSuccess(reviews));
  } catch (err) {
    dispatch(reviewsSlice.actions.getReviewsFailure(err));
  }
};

export const reducer = reviewsSlice.reducer;

export const selectors = {
  selectLoading: (state: RootState) => state.admin.reviews.loading,
  selectReviews: (state: RootState) => state.admin.reviews.reviews,
  selectReview: (state: RootState) => state.admin.reviews.review,
};
