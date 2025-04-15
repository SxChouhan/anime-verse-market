
import { Star } from '@/components/home/Star';

const ReviewsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-white to-gray-50 dark:from-otaku-dark/30 dark:to-otaku-dark/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Customer Reviews
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-otaku-dark shadow-lg p-6 rounded-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-gray-200 rounded-full w-12 h-12"></div>
              <div className="ml-4">
                <h4 className="font-bold">Mikasa A.</h4>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className="text-yellow-400 fill-yellow-400" 
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              "The Attack on Titan merch I bought is stunning! Incredible quality and fast shipping."
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg w-32 h-32">
              <img src="/placeholder.svg" alt="Review" className="w-full h-full object-cover rounded" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-otaku-dark shadow-lg p-6 rounded-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-gray-200 rounded-full w-12 h-12"></div>
              <div className="ml-4">
                <h4 className="font-bold">Gojo S.</h4>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              "The Jujutsu Kaisen figure exceeded my expectations. Simply perfect for my collection!"
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg w-32 h-32">
              <img src="/placeholder.svg" alt="Review" className="w-full h-full object-cover rounded" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-otaku-dark shadow-lg p-6 rounded-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-gray-200 rounded-full w-12 h-12"></div>
              <div className="ml-4">
                <h4 className="font-bold">Tanjiro K.</h4>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              "These Demon Slayer posters look even better in person! The print quality is superb."
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg w-32 h-32">
              <img src="/placeholder.svg" alt="Review" className="w-full h-full object-cover rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
