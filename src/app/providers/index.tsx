import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { withStore } from "./with-store";
import { withRouter } from "./with-router";
import compose from 'compose-function'

export const withProviders = compose(withStore, withRouter)