# Opportunity Management Tool (Python Django Rest backend with React Frontend )

1.This App is small CRM system for tracking deals/opporunitties which one company may have ( app is under constructions and at that moment has limited features which will be expanded in the future ). 
2. Non Registered users cannot participate in this app and registration is required ( as during the registration form will be selected specific details which will then give specific options to the user to interact with the app). 
3. Registered users can start their participation with creating new / edditing current opportunities based on their roles.
4. Each user can see his/her own opportunities or if the user is on specific role ( like city/regional/country/opps role ) can see also opportunities created withing the respective region or within his/her own team. 
Created opportunities can be modified/edited only by the owner of the opportunity or admin user. 

# Available views

1. If not logged in - can  be reached home page and options for Login or Register
2. If registered user can see home page ( where main pannel with tools is placed) profile page and logout - further features to be added!
3. in home page tools pannel - user can access opportunities list available for him/her ( based on the role ):
   3.1 add new opportunity feater - where user can create/add new opportunity ( can select client for it based on user responsible regoin, can include products from products list. can select date for it's finalization/close and put some description ).
   3.2 in opportunities list user can see summary charts for all available for him/her opportunities and then list for each single record.
   3.3 can see details for each opportunity ( and only if user is also owner of the opportunity can modify it ).
4. in home page tools pannel - user can also access lists of available for him/her clients and all listed products.
5. Admin User ( all app functonalities ) - can take every action available for normal users but also can manage other users profile status ( activate/deactivate ), can change Opportunity ownership, can create new roles, cities, products, categories
6. Opps have specific scope of actons mix between normal sales user and admind but with significant differences where:
   6.1 can't  manage other users profile status, changing opportunity ownership or editing them, creating new opportunities, creation/editting of categories, roles, cities
   6.2 can see list of roles, categories, cities (without edit/create functionality ), can create new clients ( in respnsible region ) new products and edit existing ones and have visibility of all opportunities in responsible region.

