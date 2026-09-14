import React, { useState } from 'react';
import { 
  Star, 
  MessageSquare, 
  ExternalLink, 
  CheckCircle2, 
  ThumbsUp, 
  Smartphone,
  Plus
} from 'lucide-react';
import { REVIEWS_DATA, STORE_INFO } from '../data/shopData';
import { StoreReview } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<StoreReview[]>(REVIEWS_DATA);
  const [showAddForm, setShowAddForm] = useState(false);
  const [author, setAuthor] = useState('');
  const [service, setService] = useState('iPhone Screen Replacement');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newRev: StoreReview = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      rating,
      date: 'Just now',
      service,
      comment: comment.trim(),
      verified: true,
    };

    setReviews([newRev, ...reviews]);
    setSubmittedFeedback(true);
    setTimeout(() => {
      setShowAddForm(false);
      setSubmittedFeedback(false);
      setAuthor('');
      setComment('');
    }, 2000);
  };

  return (
    <section id="reviews" className="py-16 bg-neutral-950 border-b border-neutral-800 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>Verified Customer Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight">
              Customer Reviews on Canal St
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-1">
              Read authentic feedback from New Yorkers and visitors who got their phones fixed at 259 B Canal St.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={STORE_INFO.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-neutral-200 border border-neutral-750 text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <span>View on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </a>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Rating Score Summary Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          <div className="text-center sm:text-left sm:border-r border-neutral-800 sm:pr-6">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-5xl font-black text-amber-400">4.8</span>
              <div className="space-y-1">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-[11px] text-neutral-400">Over 300+ Canal St Repairs</p>
              </div>
            </div>
          </div>

          <div className="col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
              <span className="text-neutral-400 block text-[11px]">Average Turnaround</span>
              <strong className="text-sm font-bold text-neutral-100">20–30 Minutes</strong>
            </div>
            <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
              <span className="text-neutral-400 block text-[11px]">Warranty Backing</span>
              <strong className="text-sm font-bold text-neutral-100">30-Day Guarantee</strong>
            </div>
            <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
              <span className="text-neutral-400 block text-[11px]">Service Location</span>
              <strong className="text-sm font-bold text-neutral-100">259 B Canal St, NYC</strong>
            </div>
          </div>
        </div>

        {/* Add Review Form Modal/Drawer */}
        {showAddForm && (
          <div className="bg-neutral-900 border border-neutral-750 rounded-2xl p-6 mb-8 shadow-xl max-w-2xl mx-auto">
            <h3 className="text-base font-bold text-neutral-100 mb-1">Share Your Experience at Kimi</h3>
            <p className="text-xs text-neutral-400 mb-4">
              Your honest feedback helps your neighbors find reliable phone repairs on Canal St.
            </p>

            {!submittedFeedback ? (
              <form onSubmit={handleAddReview} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Rachel K."
                      className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Service Received</label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-200 focus:outline-none focus:border-amber-400"
                    >
                      <option value="iPhone Screen Replacement">iPhone Screen Replacement</option>
                      <option value="Battery Replacement">Battery Replacement</option>
                      <option value="Back Glass Laser Repair">Back Glass Laser Repair</option>
                      <option value="Charging Port Cleaning / Fix">Charging Port Cleaning / Fix</option>
                      <option value="Purchased Refurbished Device">Purchased Refurbished Device</option>
                      <option value="Accessories & Protection">Accessories &amp; Protection</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Rating</label>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setRating(s)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-5 h-5 ${s <= rating ? 'fill-amber-400' : 'text-neutral-600'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Your Review *</label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="How was the speed, pricing, and quality of the repair?"
                    className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300 text-xs font-semibold hover:bg-neutral-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center space-y-1 text-emerald-300 text-xs">
                <CheckCircle2 className="w-6 h-6 mx-auto" />
                <p className="font-bold">Thank you for your review!</p>
                <p>Your review has been posted successfully.</p>
              </div>
            )}
          </div>
        )}

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-neutral-700 transition-colors"
            >
              <div className="space-y-3">
                {/* Rating & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-500">{rev.date}</span>
                </div>

                {/* Service Tag */}
                <div className="inline-block px-2 py-0.5 rounded bg-neutral-800 text-[11px] font-medium text-amber-300 border border-neutral-700">
                  {rev.service}
                </div>

                {/* Comment */}
                <p className="text-xs text-neutral-300 leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Verification */}
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-200">{rev.author}</span>
                {rev.verified && (
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Customer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
