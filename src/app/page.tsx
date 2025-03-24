// ...existing code...
export default function Home() {
  // ...existing code...
  
  return (
    <main className="flex min-h-screen flex-col p-4 md:p-6">
      <div className="container mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Nobs App</h1>
        
        <div className="card-grid">
          {courses.map((course, i) => (
            <div key={i} className="card-item mb-6 md:mb-0">
              <Card
                className="h-full"
                title={course.title}
                desc={course.desc}
                img={course.img}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
// ...existing code...
