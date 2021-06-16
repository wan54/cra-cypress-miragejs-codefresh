if (process.env.REACT_APP_NODE_ENV === 'development' || process.env.REACT_APP_NODE_ENV === 'e2e') {
    if (process.env.REACT_APP_NODE_ENV === 'e2e') {
        require('./server').makeServerForCypress();
    } else {
        require('./server').makeServer()
    }
}

export {};