var folders = [
    {
        id: 1,
        parentId : null,
        name: "A",
        description: "Desc A"
    },
    {
        id: 2,
        parentId : null,
        name: "B",
        description: "Desc B",        
    },
    {
        id: 3,
        parentId : 2,
        name: "C",
        description: "Desc C",        
    },
    {
        id: 4,
        parentId : 3,
        name: "D",
        description: "Desc D",        
    },
    {
        id: 5,
        parentId : 4,
        name: "E",
        description: "Desc E",        
    },
    {
        id: 6,
        parentId : 3,
        name: "F",
        description: "Desc F",        
    }
];

export default folders;