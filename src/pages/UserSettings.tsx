import { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { Camera } from 'lucide-react';

export default function UserSettings() {
  const [formData, setFormData] = useState({
    firstName: 'Ahmed',
    lastName: 'Shah',
    email: 'email@example.com',
    phone: '+92*********',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('✅ Profile updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Personal Information</h1>
        <p className="text-gray-600 mt-1">Update your basic details to keep your profile accurate and up to date.</p>
      </div>

      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Picture */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="relative">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center text-4xl font-bold text-primary-600 border-4 border-white shadow-md">
                    AS
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md border border-gray-200 hover:bg-gray-50"
              >
                <Camera className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <p className="mt-3 font-medium">AHMED</p>
            <p className="text-sm text-gray-500">{formData.email}</p>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Update Button */}
          <div className="flex justify-end pt-4">
            <Button type="submit" className="px-10 py-3">
              Update Profile
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}