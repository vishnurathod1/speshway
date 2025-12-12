document.addEventListener('DOMContentLoaded', () => {
  console.log("DOMContentLoaded event fired");
  // Sample Data
  let students = [
    { name:'John Doe', age: 20, qualification: 'High School', location: 'New York', course:'Mathematics', status:'Active', dateOfJoining:'2024-01-15' },
    { name:'Jane Smith', age: 22, qualification: 'Bachelor', location: 'California', course:'Biology', status:'Active', dateOfJoining:'2024-02-10' },
    { name:'Mark Lee', age: 21, qualification: 'Bachelor', location: 'Texas', course:'Physics', status:'Absent', dateOfJoining:'2024-03-05' },
    { name:'Emily Davis', age: 23, qualification: 'Master', location: 'Florida', course:'Chemistry', status:'Active', dateOfJoining:'2024-04-20' },
    { name:'Alice Johnson', age: 20, qualification: 'High School', location: 'New York', course:'Mathematics', status:'Active', dateOfJoining:'2024-05-12' },
    { name:'Bob Wilson', age: 22, qualification: 'Bachelor', location: 'California', course:'Biology', status:'Absent', dateOfJoining:'2024-06-18' },
    { name:'Charlie Brown', age: 21, qualification: 'Bachelor', location: 'Texas', course:'Physics', status:'Active', dateOfJoining:'2024-07-25' },
    { name:'Diana Prince', age: 23, qualification: 'Master', location: 'Florida', course:'Chemistry', status:'Active', dateOfJoining:'2024-08-30' }
  ];

  let trainers = [
    { name:'Mr. Alex', age: 40, qualification: 'PhD Physics', location: 'New York', experience: '10 years', course:'Physics', status:'Active', dateOfJoining:'2023-01-10' },
    { name:'Ms. Emma', age: 35, qualification: 'MSc Chemistry', location: 'California', experience: '8 years', course:'Chemistry', status:'On Leave', dateOfJoining:'2023-02-15' },
    { name:'Dr. Smith', age: 45, qualification: 'PhD Mathematics', location: 'Texas', experience: '15 years', course:'Mathematics', status:'Active', dateOfJoining:'2023-03-20' },
    { name:'Prof. Johnson', age: 50, qualification: 'PhD Biology', location: 'Florida', experience: '20 years', course:'Biology', status:'Active', dateOfJoining:'2023-04-25' },
    { name:'Mr. Lee', age: 38, qualification: 'MSc Physics', location: 'New York', experience: '12 years', course:'Physics', status:'Absent', dateOfJoining:'2023-05-30' }
  ];

  let courses = [
    { title:'Math Basics', duration:'3 months', popularity:120 },
    { title:'Physics Advanced', duration:'4 months', popularity:90 },
    { title:'Chemistry Intro', duration:'2 months', popularity:60 },
    { title:'Biology Fundamentals', duration:'3 months', popularity:80 },
    { title:'Computer Science', duration:'5 months', popularity:100 }
  ];

  let assignments = [
    { title:'Algebra Homework', course:'Math Basics', due:'2025-09-25', status:'Pending' },
    { title:'Physics Lab', course:'Physics Advanced', due:'2025-09-22', status:'Submitted' },
    { title:'Chemistry Report', course:'Chemistry Intro', due:'2025-09-28', status:'Pending' },
    { title:'Biology Quiz', course:'Biology Fundamentals', due:'2025-09-30', status:'Overdue' },
    { title:'CS Project', course:'Computer Science', due:'2025-10-05', status:'Pending' }
  ];

  let materials = [
    { title:'Math Notes', link:'#' },
    { title:'Physics Slides', link:'#' },
    { title:'Chemistry Handbook', link:'#' },
    { title:'Biology Diagrams', link:'#' },
    { title:'CS Tutorials', link:'#' }
  ];

  let liveClasses = [
    { title:'Math Live Session', trainer:'Mr. Alex', date:'2025-09-21', link:'https://zoom.us/j/1234567890' },
    { title:'Physics Discussion', trainer:'Dr. Smith', date:'2025-09-23', link:'https://meet.google.com/abc-defg-hij' },
    { title:'Chemistry Lab', trainer:'Ms. Emma', date:'2025-09-25', link:'https://zoom.us/j/0987654321' },
    { title:'Biology Review', trainer:'Prof. Johnson', date:'2025-09-27', link:'https://meet.google.com/xyz-uvw-rst' }
  ];

  let recordedClasses = [
    { title:'Chemistry Recorded', course:'Chemistry Intro', link:'https://www.youtube.com/watch?v=ysz5S6PUM-U' },
    { title:'Math Basics Video', course:'Math Basics', link:'https://www.youtube.com/watch?v=jNQXAC9IVRw' },
    { title:'Physics Lecture', course:'Physics Advanced', link:'https://www.youtube.com/watch?v=ScMzIvxBSi4' },
    { title:'Biology Session', course:'Biology Fundamentals', link:'https://www.youtube.com/watch?v=aqz-KE-bpKQ' },
    { title:'CS Workshop', course:'Computer Science', link:'https://www.youtube.com/watch?v=3fumBcKC6RE' }
  ];
=======
console.log("dashboard.js loaded");

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOMContentLoaded event fired");

  // API Base URL
  const API_BASE = 'http://localhost:8000';

  // Global data variables
  let students = [];
  let trainers = [];
  let courses = [];
  let assignments = [];
  let materials = [];
  let liveClasses = [];
  let recordedClasses = [];

  // Fetch data from API
  async function fetchData() {
    try {
      const [studentsRes, trainersRes, coursesRes, assignmentsRes, materialsRes, liveRes, recordedRes] = await Promise.all([
        fetch(`${API_BASE}/api/students/`),
        fetch(`${API_BASE}/api/trainers/`),
        fetch(`${API_BASE}/api/courses/`),
        fetch(`${API_BASE}/api/assignments/`),
        fetch(`${API_BASE}/api/materials/`),
        fetch(`${API_BASE}/api/live-classes/`),
        fetch(`${API_BASE}/api/recorded-classes/`)
      ]);

      students = await studentsRes.json();
      trainers = await trainersRes.json();
      courses = await coursesRes.json();
      assignments = await assignmentsRes.json();
      materials = await materialsRes.json();
      liveClasses = await liveRes.json();
      recordedClasses = await recordedRes.json();

      console.log("Data loaded from API");
      initializeDashboard();
    } catch (error) {
      console.error("Error fetching data:", error);
      // Fallback to sample data if API fails
      loadSampleData();
      initializeDashboard();
    }
  }

  // Sample data fallback
  function loadSampleData() {
    students = [
      { username:'John Doe', age: 20, qualification: 'High School', location: 'New York', date_of_joining:'2024-01-15' },
      { username:'Jane Smith', age: 22, qualification: 'Bachelor', location: 'California', date_of_joining:'2024-02-10' },
      { username:'Mark Lee', age: 21, qualification: 'Bachelor', location: 'Texas', date_of_joining:'2024-03-05' },
      { username:'Emily Davis', age: 23, qualification: 'Master', location: 'Florida', date_of_joining:'2024-04-20' }
    ];

    trainers = [
      { username:'Mr. Alex', age: 40, qualification: 'PhD Physics', location: 'New York', experience: '10 years', date_of_joining:'2023-01-10' },
      { username:'Ms. Emma', age: 35, qualification: 'MSc Chemistry', location: 'California', experience: '8 years', date_of_joining:'2023-02-15' }
    ];

    courses = [
      { title:'Math Basics', duration:'3 months', popularity:120 },
      { title:'Physics Advanced', duration:'4 months', popularity:90 }
    ];

    assignments = [
      { title:'Algebra Homework', course__title:'Math Basics', due_date:'2025-09-25', status:'Pending' },
      { title:'Physics Lab', course__title:'Physics Advanced', due_date:'2025-09-22', status:'Submitted' }
    ];

    materials = [
      { title:'Math Notes', file:'#' },
      { title:'Physics Slides', file:'#' }
    ];

    liveClasses = [
      { title:'Math Live Session', trainer__username:'Mr. Alex', course__title:'Math Basics', date:'2025-09-21', link:'https://zoom.us/j/1234567890' },
      { title:'Physics Discussion', trainer__username:'Dr. Smith', course__title:'Physics Advanced', date:'2025-09-23', link:'https://meet.google.com/abc-defg-hij' }
    ];

    recordedClasses = [
      { title:'Chemistry Recorded', course__title:'Chemistry Intro', link:'https://www.youtube.com/watch?v=ysz5S6PUM-U' },
      { title:'Math Basics Video', course__title:'Math Basics', link:'https://www.youtube.com/watch?v=jNQXAC9IVRw' }
    ];
  }

  function initializeDashboard() {
