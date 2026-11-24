import { useState } from 'react';

export default function CommentSection({ comment, onChangeComment }) {
  return (
    <section className="attachment-section">
      <h3 className="attachment-section__title">IZOH (IXTIYORIY)</h3>
      <textarea
        className="comment-textarea"
        value={comment}
        onChange={(e) => onChangeComment(e.target.value.slice(0, 1000))}
        placeholder="Izoh yozing..."
        maxLength={1000}
        rows={4}
      />
      <div className="comment-counter">{comment.length} / 1000</div>
    </section>
  );
}
