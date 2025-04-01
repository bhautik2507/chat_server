module.exports = {
    port: process.env.PORT || 3000,
    
    // Conversation settings
    inactivityTimeout: 30 * 60 * 1000, // 30 minutes in milliseconds
    cleanupInterval: 5 * 60 * 1000, // Run cleanup every 5 minutes
    
    // Cluster configuration
    enableClustering: true
  };