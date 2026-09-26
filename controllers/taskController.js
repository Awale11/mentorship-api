import Task from "../models/Task.js";

// Create task
export const createTask = async (req, res, next) => {
  try {
    // wax walba oo uso paaso sidooda u qaado,body-ga waxa ku jira oo dhan diiwan gali
    // createdBy: req.user._id=wa user-ka hada qadka ku jira, waxana no sheegayo middleware protectiga
    const task = await Task.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// Get tasks
export const getMyTasks = async (req, res, next) => {
  try {
    // waxadku raadisaa user-ka qadka ku jira
    const tasks = await Task.find({ createdBy: req.user._id });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// Update task
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
        // task-ga la update gareen rabo id-giisa
        // task aan update-gareen rabo marka hore waa inu jiraa kadib user-ka hada qadka ku jiro iyo qofka sameeyay task-ga waa inee islahaadaan yani qofka iska leh lee update gareen karo
      { _id: req.params.id, createdBy: req.user._id },
    // everything oo body-ga ku jira update-garee
      req.body,
    // wixi la update gareeyay nooso celi
      { new: true }
    );
    // hadii task-ga la waayo
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);

  } catch (err) {
    next(err);
  }
};

// Delete task
export const deleteTask = async (req, res, next) => {
  try {
    // hal object delete
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });
    
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};