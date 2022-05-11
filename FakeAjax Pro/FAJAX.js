class FXMLHttpRequest {
    url;
    method;
    dataBody;
    open = (method, url, databody) => {
        this.url = url;
        this.method = method;
        this.dataBody = databody;
    };
    send = () => {
        return server(this);
    }
}
