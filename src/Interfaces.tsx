export interface CourseInfo {
    title: string;
    prereqs: Array<string>;
    desc: string;
    requirements: { [title: string] : Array<string>};
    listing: { [title: string] : Array<string> };
    next: Array<string>;
};

// {"title": "Programming with Software Libraries", "prereqs": ["ICS 31 min grade = C OR CSE 41 min grade = C"], "desc": "Construction of programs for problems and computing environments more varied than in I&C\u00a0SCI\u00a031. Using library modules for applications such as graphics, sound, GUI, database, Web, and network programming. Language features beyond those in I&C\u00a0SCI\u00a031 are introduced as needed.", "requirements": {"Computer Science": ["Lower-division"], "Data Science": ["Lower-division"], "Informatics": ["Lower-division"]}, "listing": {"Fall": ["Alex Thornton"], "Winter": ["Alex Thornton"], "Spring": ["Alex Thornton"]}, "next": ["EECS 31L", "INF 43", "ICS 33"]}