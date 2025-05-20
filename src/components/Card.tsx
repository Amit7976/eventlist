import React from 'react'

function Card({event}:any) {
  return (
      <>
          <div
              style={{
                  border: "1px solid #ccc",
                  borderRadius: 6,
                  padding: 10,
                  marginBottom: 10,
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
              }}
          >
              {event.image && (
                  <img
                      src={event.image}
                      alt={event.title}
                      style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }}
                  />
              )}
              <div>
                  <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontWeight: "bold", fontSize: 16, color: "#0070f3" }}
                  >
                      {event.title}
                  </a>
                  <p style={{ margin: 2 }}>{event.date}</p>
                  <p style={{ margin: 2, fontStyle: "italic" }}>{event.location}</p>
                  <p style={{ margin: 2, fontStyle: "italic" }}>{event.price}</p>
              </div>
          </div>
      </>
  )
}

export default Card