import React, { useState, useEffect } from 'react';
import './CollectionSearchBar.css';

function CollectionSearchBar( {searchTerm, setSearchTerm} ) {

    return (
        <div className="collection-search-bar-ctn">
            <input
                type="text"
                placeholder="(╭ರ_•́) Search Library..."
                className="input-field"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

export default CollectionSearchBar;
