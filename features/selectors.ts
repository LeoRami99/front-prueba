import { RootState } from "../app/store";

export const selectTokenCard = (s: RootState) => s.cardToken.tokenCard;
export const selectAcceptedToken = (s: RootState) => s.terms.acceptedToken;
export const selectStep = (s: RootState) => s.steps.step;

export const selectProduct = (s: RootState) => s.product;
export const selectTransaction = (s: RootState) => s.transaction;
export const selectInternalTx = (s: RootState) => s.internalTx.id;
