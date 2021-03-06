import React from "react";

import { PlayList } from "./playList";

function PublicAppWebView() {
  return (
    <div id="appPublic-react">
      {process.env.NODE_ENV === "production" ? (
        <PlayList />
      ) : (
        <h1 className="text-center">App Public</h1>
      )}
      {/* <PlayList /> */}
    </div>
  );
}

export default PublicAppWebView;
