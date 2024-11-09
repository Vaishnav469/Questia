export const fetchTeacherClassrooms = async (teacherUid: string) => { 
    console.log("this is:", process.env.PYTHON_BACKEND)
    const response = await fetch(`${process.env.PYTHON_BACKEND}/teacher_classrooms?teacher_uid=${teacherUid}`); 
    if (!response.ok) { 
        throw new Error('Failed to fetch classrooms'); 
    }   
    return response.json(); 
};
