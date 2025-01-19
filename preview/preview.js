function handler(event) {
    const request = event.request;
    const uri = request.uri;

    // Extract PR number if present (format: /PR-123/...)
    const prMatch = uri.match(/^\/PR-(\d+)(\/.*)?$/);

    if (prMatch) {
        // Get PR number and remaining path
        const prNumber = prMatch[1];
        const remainingPath = prMatch[2] || '/';

        // Modify the uri to point to the PR-specific directory
        request.uri = `/preview-deployments/PR-${prNumber}${remainingPath}`;

        // If the path ends with /, append index.html
        if (request.uri.endsWith('/')) {
            request.uri += 'index.html';
        }
    } else {
        // Handle requests to production (main branch)
        if (uri.endsWith('/')) {
            request.uri += 'index.html';
        }
    }

    return request;
}