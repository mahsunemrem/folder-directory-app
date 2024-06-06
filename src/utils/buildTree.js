var buildTree = function (folders) {
    const map = {};
    const roots = [];
  
    folders.forEach(folder => {
      map[folder.id] = { ...folder, children: [] };
    });
  
    folders.forEach(folder => {
      if (folder.parentId === null) {
        roots.push(map[folder.id]);
      } else {
        if (map[folder.parentId]) {
          map[folder.parentId].children.push(map[folder.id]);
        }
      }
    });
  
    return roots;
}

export default buildTree;