export interface Project {
    pageId: string;
    date: string;
    created: string;
    goal: string;
    collected: string;
    image: string;
    body: string;
    description: string;
    title: string;
    author: string;
    status: string;
    ratings: [{
        user: string;
        rating: string;
    }];
}
