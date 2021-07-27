export default {
    name: "project",
    title: "Project",
    type: "document",
    fields: [
        {
            name: "title",
            type: "string"
        },
        {
            name: "date",
            type: "datetime"
        },
        {
            name: "palce",
            type: "string"
        },
        {
            name: "description",
            type: "text"
        },
        {
            name: "projectType",
            title: "Project type",
            type: "string",
            options: {
                list: [
                    { value: "personal", title: "Personal" },
                ]
            }
        },
        {
            name: "link",
            type: "url",
            of: [
                {
                    type: "string"
                },
            ],
            options: {
                layout: "tags",
            },
        }
    ]
}