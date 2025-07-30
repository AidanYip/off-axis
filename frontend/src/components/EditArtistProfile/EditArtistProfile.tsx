import { FC, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './EditArtistProfile.css';
import { User } from '../../interface';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditArtistProfile: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    town: '',
    mobile_number: '',
    music_link: '',
    genre: '',
    links: '',
    first_headline_gig: '',
    need_help_booking: false,
    bio: '',
    image: null as File | null,
    bank_full_name: '',
    bank_account_type: '',
    bank_account_number: '',
    sort_code: '',
  });

  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        setUser(null);
        toast.warn('To edit profile, please login first.', { autoClose: 8000 });
        navigate("/login?callbackUrl=/profile");
        return;
      }
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
          });
          const data = await response.json();
          if (data.success) {
            setUser(data.result);
            fetchArtistId(data.result.user_id);
          } else {
            setUser(null);
            localStorage.removeItem('jwt_token');
          }
      } catch (err) {
        console.error("User verification failed:", err);
        setUser(null);
      }
    };

    const fetchArtistId = async (user_id: number) => {
      try {
          const response = await fetch('/api/artists/getArtistIdByUserId', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ user_id }),
          });

          if (!response.ok) {
              throw new Error('Failed to fetch artist ID.');
          }

          const dataArtist = await response.json();

          if (dataArtist.success) {
              fetchArtist(dataArtist.result[0].artist_id);
          } else {
              navigate('/join');
          }
      } catch (err) {
          toast.warn('To access artist profile, please submit this form first.', { autoClose: 8000 });
          console.error("Fetch Artist ID failed:", err);
          navigate('/');
      }
    };

    const fetchArtist = async (artist_id: number) => {
      const response = await fetch('/api/artists/getArtistById', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({artist_id}),
      });

      if (!response.ok){
          throw new Error("Failed to fetch Artist");
      }

      const data = await response.json();
      const artist = data.result[0];
      const genre = artist.genre ? artist.genre.join(", ") : "";
      const links = artist.links
      ? Object.entries(artist.links)
          .map(([platform, link]) => 
            `${platform.charAt(0).toUpperCase() + platform.slice(1)}:${typeof link === "string" ? link : ''}`
          )
          .join(", ") // Ensure spaces after commas
      : "";
      setFormData({...artist, links, genre});
    };
    fetchUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (type === 'file') {
      const { files } = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        image: files ? files[0] : null,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const linksRegex = /^(\s*[a-zA-Z]+:\s*[^,]+,)*\s*[a-zA-Z]+:\s*[^,]+$/;
    if (!linksRegex.test(formData.links) && formData.links !== '') {
      toast.warn('Links must follow the format: "Instagram: https://www.instagram.com/<user>, X: https://www.x.com/<user>"');
      return;
    }

    const requestBody = new FormData();
    requestBody.append('user_id', user?.user_id.toString() || '');

    const genreArray = formData.genre.split(/\s*,\s*/);
    const genreJSON = JSON.stringify(genreArray);

    const linksArray = formData.links.split(/\s*,\s*/);
    const linksObject = linksArray.reduce((acc, link) => {
      const [key, value] = link.split(/:(.*)/);
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>); // format link string to JSON object
    const linksJSON = JSON.stringify(linksObject);

    Object.keys(formData).forEach(key => {
      if (formData[key as keyof typeof formData] !== null) {
        if (key === 'genre') {
          requestBody.append(key, genreJSON);
        } else if (key === 'links') {
          requestBody.append(key, linksJSON);
        } else {
          requestBody.append(key, formData[key as keyof typeof formData] as string | Blob);
        }
      }
    });

    try {
      const response = await fetch('/api/artists/updateArtist', {
        method: 'POST',
        body: requestBody,
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Profile Updated!");
        navigate('/profile');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Internal Server Error');
    }
  };

  return (
    <div className="form-container">
      <a href="/profile">
        <button className="back-button">Return</button>
      </a>
      <h2 id="h2Reg">Edit Profile</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group-parent">
          <div className='form-group-child'>
            <div className='form-element'>
              <label htmlFor="name">Artist/Band Name <span className="required">*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Artist/Band Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-element'>
              <label htmlFor="music_link">Music Link <span className="required">*</span></label>
              <input
                type="text"
                id="music_link"
                name="music_link"
                placeholder="Spotify, YouTube, Soundcloud..."
                value={formData.music_link}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className='form-group-child'>
            <div className='form-element'>
              <label htmlFor="town">Town/City <span className="required">*</span></label>
              <input
                type="text"
                id="town"
                name="town"
                placeholder="Glasgow"
                value={formData.town}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-element'>
              <label htmlFor="mobile_number">Mobile Number <span className="required">*</span></label>
              <input
                type="text"
                id="mobile_number"
                name="mobile_number"
                placeholder="07### ######"
                value={formData.mobile_number}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className='form-element'>
          <label htmlFor="genre">Best Fit Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            placeholder="Genre 1, Genre 2"
            value={formData.genre}
            onChange={handleChange}
          />
        </div>

        <div className="form-element">
          <label htmlFor="links">Website / LinkTree / Socials</label>
          <input
            type="text"
            id="links"
            name="links"
            placeholder="E.g. Instagram:https://www.instagram.com/<user>, X:https://www.x.com/<user>"
            value={formData.links}
            onChange={handleChange}
          />
        </div>
        <div className="form-element">
          <label htmlFor="bio">Edit Your short biography. (MAX 300 words)</label>
          <textarea
            id="bio"
            name="bio"
            placeholder="Biography Here"
            rows={5}
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        <div className="form-element">
          <label htmlFor="image">Change your profile image. (.png, .jpg, .jpeg) <span className="required">*</span></label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        <h1 id="h1Bank">Bank Details</h1>
        <div className="form-group-parent">
          <div className='form-group-child'>
            <div className='form-element'>
              <label htmlFor="bank_full_name">Full Name as it appears on account <span className="required">*</span></label>
              <input
                type="text"
                id="bank_full_name"
                name="bank_full_name"
                placeholder="Full Name"
                value={formData.bank_full_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-element'>
              <label htmlFor="bank_account_number">Account Number <span className="required">*</span></label>
              <input
                type="text"
                id="bank_account_number"
                name="bank_account_number"
                placeholder="12345678"
                value={formData.bank_account_number}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className='form-group-child'>
            <div className='form-element'>
              <label htmlFor="bank_account_type">Bank Account Type <span className="required">*</span></label>
              <input
                type="text"
                id="bank_account_type"
                name="bank_account_type"
                placeholder="Bank Account Type"
                value={formData.bank_account_type}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-element'>
              <label htmlFor="sort_code">Sort Code <span className="required">*</span></label>
              <input
                type="text"
                id="sort_code"
                name="sort_code"
                placeholder="12-34-56"
                value={formData.sort_code}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className="gradientButton">Save</button>
      </form>
    </div>
  );
}

export default EditArtistProfile;
