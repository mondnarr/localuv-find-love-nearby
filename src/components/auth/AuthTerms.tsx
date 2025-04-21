
const AuthTerms = () => {
  return (
    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t dark:border-gray-700">
      <p className="text-xs sm:text-sm text-center text-gray-600 dark:text-gray-400">
        By continuing, you agree to LocaLuv's{' '}
        <a href="#" className="text-localuv-primary hover:underline">Terms of Service</a>
        {' '}and{' '}
        <a href="#" className="text-localuv-primary hover:underline">Privacy Policy</a>
      </p>
    </div>
  );
};

export default AuthTerms;
