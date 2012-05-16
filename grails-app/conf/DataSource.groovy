dataSource {
	pooled = true
	driverClassName = "com.mysql.jdbc.Driver"
	dialect = "org.hibernate.dialect.MySQL5InnoDBDialect"
	username = "root"
	password = "root"
}
hibernate {
	cache.use_second_level_cache = true
	cache.use_query_cache = true
	cache.provider_class = 'net.sf.ehcache.hibernate.EhCacheProvider'
}
// environment specific settings
environments {
	development {
		dataSource {
			dbCreate = "update" // one of 'create', 'create-drop','update'
			url = "jdbc:mysql://localhost/livrocaixa?useUnicode=yes&characterEncoding=UTF-8"
		}
		hibernate { show_sql = true }
	}
	test {
		dataSource {
			dbCreate = "update"
			url = "jdbc:mysql://localhost/livrocaixa?useUnicode=yes&characterEncoding=UTF-8"
		}
	}
	production {
		dataSource {
			dbCreate = "update"
			url = "jdbc:mysql://localhost/livrocaixa?useUnicode=yes&characterEncoding=UTF-8"
		}
	}
}
