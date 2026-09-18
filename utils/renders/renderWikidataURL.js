import React from "react";

export const renderWikidataURL = (text, record, index) => {
  return text && <a href={`https://www.wikidata.org/wiki/${text}`} target={'_new'}>{`https://www.wikidata.org/wiki/${text}`}</a>
};
